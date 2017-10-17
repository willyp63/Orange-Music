const Express = require('express');
const path = require('path');

const ytApi = require('./api/yt/yt_api');
const isEmpty = require('./util/empty').isEmpty;

const STATIC_RESOURCES_PATH = path.resolve(__dirname, '..', 'client', 'static');
const INDEX_HTML_PATH = path.resolve(STATIC_RESOURCES_PATH, 'index.html');

const app = Express();

/// Serve static resources.
app.get('/', (_, res) => res.sendFile(INDEX_HTML_PATH));
app.use('/static', Express.static(STATIC_RESOURCES_PATH));

/// Streams audio.
app.get('/stream', (req, res) => {
  ytApi.search({
    name: req.query.q,
    artistName: req.query.aq,
    duration: req.query.dur,
    maxResults: 1
  }).then((videos) => {
    if (isEmpty(videos)) {
      console.log('Could not find any vidoes that match that query.');
    }
    ytApi.stream(videos[0].id.videoId).pipe(res);
  }, (err) => {
    console.log(err);
  });
});

/// Start the server.
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Serving @ http://localhost:${port}/`));
