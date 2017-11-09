const router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../secrets/jwt');
const bodyParser = require('body-parser');

const stream = require('./stream');
const user = require('./user');
const playlists = require('./playlists');

/// JSON API
router.use(bodyParser.json());
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

/// JWT Auth
router.use((req, res, next) => {
  // Token can be a url param or in request body.
  const token = req.body.token || req.query.token;

  // Try to decode token and add user obj to request.
  //
  // Routes can test auth by checking if req.user is truthy.
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.user;
    } catch (e) { req.user = false; }
  } else { req.user = false; }

  next();
});

/// Routes
router.use('/stream', stream);
router.use('/user', user);
router.use('/playlists', playlists);

module.exports = router;
