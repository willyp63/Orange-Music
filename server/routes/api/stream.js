const router = require('express').Router();
const ytApi = require('../../api_util/youtube');

/// Return a Youtube video matching the query params.
///
/// Params: {
///   q: query for track name,
///   aq: query for artist name,
/// }
router.get('/video', async (req, res) => {
  const { q, aq } = req.query;

  // Get first search result.
  const videos = await ytApi.search({
    name: q,
    artistName: aq,
    maxResults: 1,
  });

  // Get more info on video.
  const videoId = videos[0].id.videoId;
  const videoInfo = await ytApi.getInfo(videoId);

  // Format response.
  const video = Object.assign(
    videos[0],
    videoInfo,
    {stream: {url: `/api/v1/stream/${videoId}`}}
  );

  res.end(JSON.stringify(video));
});

/// Stream audio for a given Youtube video id.
///
/// Params: {
///   videoId: Youtube video id
/// }
router.get('/:videoId', (req, res) => {
  try {
    ytApi.stream(req.params.videoId).pipe(res);
  } catch (exception) {
    res.status(500).send(exception);
  }
});

module.exports = router;
