const router = require('express').Router();
const bodyParser = require('body-parser');
const stream = require('./stream');
const user = require('./user');

/// JSON API.
router.use(bodyParser.json());
router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.use('/stream', stream);
router.use('/user', user);

module.exports = router;
