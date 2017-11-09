const service = require('googleapis').youtube('v3');
const ytStream = require('youtube-audio-stream');
const API_KEY = require('../secrets/api_keys').YOUTUBE_API_KEY;
const isEmpty  = require('lodash.isempty');


const DEFAULT_MAX_RESULTS = 20;


/// Search for Youtube videos.
module.exports.search = ({name, artistName, maxResults}) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(name)) { reject('Must provide a name.'); }

    const query = isEmpty(artistName) ? name : `${name} ${artistName}`;
    service.search.list({
      auth: API_KEY,
      part: 'id,snippet',
      q: query,
      maxResults: maxResults || DEFAULT_MAX_RESULTS
    }, (err, response) => {
      err
        ? reject(`Error while trying to fetch YT videos: ${err}`)
        : resolve(response.items);
    });
  });
};

/// Get details on a Youtube video.
module.exports.getInfo = (videoId) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(videoId)) { reject('Must provide videoId.'); }

    service.videos.list({
      auth: API_KEY,
      part: 'id,contentDetails',
      id: videoId
    }, (err, response) => {
      if (err || isEmpty(response.items)) {
        return reject(`Error while trying to fetch YT video info: ${err}`);
      }

      // Format time in a way that makes more sense to me.
      response.items[0].contentDetails.duration =
        formatTimeSeconds(response.items[0].contentDetails.duration);

      return resolve(response.items[0]);
    });
  });
};

/// Stream a Youtube video's audio.
module.exports.stream = (videoId) => ytStream(getYoutubeUrl(videoId));


const formatTimeSeconds = (time) => {
  const ptMatch = time.match(/PT(.+)/);
  if (isEmpty(ptMatch)) { return 0; }
  const sMatch = ptMatch[1].match(/(\d+)S/);
  const mMatch = ptMatch[1].match(/(\d+)M/);
  time = 0;
  if (!isEmpty(sMatch)) { time += parseInt(sMatch[1]); }
  if (!isEmpty(mMatch)) { time += parseInt(mMatch[1]) * 60; }
  return time;
}

const getYoutubeUrl = (videoId) => `http://youtube.com/watch?v=${videoId}`;
