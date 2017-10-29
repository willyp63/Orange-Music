const Express = require('express');
const path = require('path');

const ytApi = require('./api/yt/yt_api');
const isEmpty = require('./util/empty').isEmpty;

const STATIC_RESOURCES_PATH = path.resolve(__dirname, 'static');
const INDEX_HTML_PATH = path.resolve(STATIC_RESOURCES_PATH, 'index.html');

const app = Express();

/// Serve static resources.
app.get('/', (_, res) => res.sendFile(INDEX_HTML_PATH));
app.use('/static', Express.static(STATIC_RESOURCES_PATH));

/// Stream audio for a given YT video id.
///
/// Params: {
///   vid: YT video id
/// }
app.get('/stream', (req, res) => {
  if (isEmpty(req.query.vid)) {
    return res.end(JSON.stringify({err: 'Must provide a video id (vid).'}));
  }
  ytApi.stream(req.query.vid).pipe(res);
});

/// Search for a video matching Params and return its meta data.
///
/// Params: {
///   q: query for track name,
///   aq: query for artist name,
///   dur: the duration of the track in seconds (ie. '124' = 124 seconds)
/// }
app.get('/video', (req, res) => {
  ytApi.search({
    name: req.query.q,
    artistName: req.query.aq,
    duration: req.query.dur,
    maxResults: 1
  }).then((videos) => {
    const videoId = videos[0].id.videoId;
    return ytApi.getInfo(videoId).then((videoInfo) => {
      const stream = {stream: {url: `/stream?vid=${videoId}`}};
      const response = Object.assign(videos[0], videoInfo, stream);
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(response));
    });
  }, (err) => {
    return res.end(JSON.stringify({err}));
  });
});

/// Start the server.
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Serving @ http://localhost:${port}/`));
