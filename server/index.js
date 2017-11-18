const Express = require('express');
const morgan = require('morgan');
const path = require('path');
const initDB = require('./db/init');
const populateDB = require('./db/populate');
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
  '/playlists/tracks',
], (_, res) => res.sendFile(REACT_APP_PATH));

/// Unused routes.
app.get('/*', (_, res) => res.end('Nothing to see here ...'));

/// Start-up Script.
(async () => {
  await initDB();

  app.listen(port, () => {
    console.log(`\n\nServing @ http://localhost:${port}/`)
  });
  
  await populateDB();
  console.log('\nFinished Populating Database!\n');
})();
