const router = require('express').Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../secrets/jwt');
const bodyParser = require('body-parser');
const stream = require('./stream');
const user = require('./user');
const playlists = require('./playlists');

/// JSON API.
router.use(bodyParser.json());
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Decode JWT.
router.use((req, res, next) => {
  const token = req.body.token || req.query.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.user;
    } catch (e) {}
  }

  next();
});

router.use('/stream', stream);
router.use('/user', user);
router.use('/playlists', playlists);

module.exports = router;
