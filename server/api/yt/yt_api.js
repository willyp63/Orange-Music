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

module.exports.stream = (videoId) => {
  return ytStream(getYoutubeUrl(videoId));
};

/// Returns the Url for a Youtube video given the videoId.
const getYoutubeUrl = (videoId) => `http://youtube.com/watch?v=${videoId}`;
