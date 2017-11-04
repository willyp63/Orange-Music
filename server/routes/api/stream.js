const router = require('express').Router();
const ytApi = require('../../api_util/youtube');
const isEmpty = require('lodash.isempty');

/// Stream audio for a given Youtube video id.
///
/// Params: {
///   vid: Youtube video id
/// }
router.get('/', (req, res) => {
  const { vid } = req.query;
  ytApi.stream(vid).pipe(res);
});

/// Search for a video matching the query params and return its meta data.
///
/// Params: {
///   q: query for track name,
///   aq: query for artist name,
///   dur: the duration of the track in seconds (ie. '124' = 124 seconds)
/// }
router.get('/video', async (req, res) => {
  const { q, aq, dur } = req.query;
  const videos = await ytApi.search({
    name: q,
    artistName: aq,
    duration: dur,
    maxResults: 1,
  });

  const videoId = videos[0].id.videoId;
  const videoInfo = await ytApi.getInfo(videoId);

  const streamObj = {stream: {url: `/api/v1/stream?vid=${videoId}`}};
  const videoObj = Object.assign(videos[0], videoInfo, streamObj);

  res.end(JSON.stringify(videoObj));
});

module.exports = router;
