const Express = require('express');
const morgan = require('morgan');
const path = require('path');
const createTables = require('./db/create_tables');
const api = require('./routes/api');

const app = Express();
const port = process.env.PORT || 8080;
const STATIC_RESOURCES_PATH = path.resolve(__dirname, 'static');
const REACT_APP_PATH = path.resolve(STATIC_RESOURCES_PATH, 'index.html');

// use morgan to log requests to the console
app.use(morgan('dev'));

/// API
app.use('/api/v1', api);

/// Static resources.
app.use('/static', Express.static(STATIC_RESOURCES_PATH));

/// React App.
app.get([
  '/',
  '/search',
  '/queue',
  '/playlists',
  '/signup',
], (_, res) => res.sendFile(REACT_APP_PATH));

/// Unused routes.
app.get('/*', (_, res) => res.end("Nothing to see here ..."));

/// Start-up Script.
(async () => {
  await createTables();
  app.listen(port, () => {
    console.log(`Serving @ http://localhost:${port}/`)
  });
})();
