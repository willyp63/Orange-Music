const service = require('googleapis').youtube('v3');
const ytStream = require('youtube-audio-stream');
const API_KEY = require('../../secrets/api_keys').YOUTUBE_API_KEY;
const isEmpty = require('../../util/empty').isEmpty;

const DEFAULT_MAX_RESULTS = 20;

module.exports.search = ({name, artistName, duration, maxResults}) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(name)) { reject('Must provide a name.'); }

    const query = isEmpty(artistName)
      ? name
      : `${name} ${artistName}`;
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

module.exports.getInfo = (ytid) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(ytid)) { reject('Must provide ytid.'); }

    service.videos.list({
      auth: API_KEY,
      part: 'id,contentDetails',
      id: ytid
    }, (err, response) => {
      if (err) {
        return reject(`Error while trying to fetch YT video info: ${err}`);
      }
      response.items[0].contentDetails.duration = formatTimeSeconds(response.items[0].contentDetails.duration);
      return resolve(response.items[0]);
    });
  });
};

module.exports.stream = (videoId) => {
  return ytStream(getYoutubeUrl(videoId));
};

const formatTimeSeconds = (time) => {
  const match = time.match(/PT(\d+)M(\d+)S/);
  return parseInt(match[1]) * 60 + parseInt(match[2]);
}

/// Returns the Url for a Youtube video given the videoId.
const getYoutubeUrl = (videoId) => `http://youtube.com/watch?v=${videoId}`;
