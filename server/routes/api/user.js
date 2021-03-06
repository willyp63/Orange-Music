const router = require('express').Router();
const db = require('../../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../secrets/jwt');
const validateSignUp = require('../../../shared/validators/sign_up');
const User = require('../../db/models/user');
 
/// Sign-up a new user.
///
/// Insert user & send back auth token.
///
/// Params: {
///   name: User's name,
///   password: User's password,
/// }
router.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  // Validate form data.
  const errors = validateSignUp({name, password});
  if (!errors.valid) { return res.json({success: false, errors}); }

  try {
    // Insert user, then fetch same user so we can get the user's id.
    await db.query(User.insert(name, password));
    const user = (await db.query(User.get(name))).rows[0];

    // Send back token.
    res.json({success: true, token: getJWT(user)});
  } catch (e) {
    if (e.constraint === 'users_name_key') {
      // Database error indicates that username is not unique
      const errors = {name: ['Username is already taken.']};
      res.json({success: false, errors});
    } else {
      console.error(e);
    }
  }
});

/// Log-in an existing user.
///
/// Check credentials and if valid, respond with an auth token.
///
/// Params: {
///   name: User's name,
///   password: User's password,
/// }
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    // Check credentials.
    const user = (await db.query(User.get(name))).rows[0];
    if (!user || user.password !== password) {
      const errors = {password: ['Username/ password pair not found.']};
      return res.json({success: false, errors});
    }

    // Send back token.
    res.json({success: true, token: getJWT(user)});
  } catch (e) {
    console.error(e);
  }
});

/// Returns {success: true} if the sender has valid auth token.
///
/// Responds with user object if valid auth token.
///
/// Can be used to initiate a browser session from a stored token.
router.get('/verify', async (req, res) => {
  if (!req.user ) { return res.json({success: false}); }
  try {
    // Check that user still exists.
    const user = (await db.query(User.get(req.user.name))).rows[0];
    if (!user ) { return res.json({success: false}); }

    // Send back user.
    res.json({success: true, user: getSafeUser(user)});
  } catch (e) {
    console.error(e);
  }
});

const getJWT = user => {
  return jwt.sign({user: getSafeUser(user)}, JWT_SECRET, {expiresIn: '12h'});
};

const getSafeUser = user => {
  return Object.assign({}, user, {password: undefined});
};

module.exports = router;
