const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validate = require('../../../shared/validators/sign_up');
const db = require('../../db');
const JWT_SECRET = require('../../secrets/jwt');

/// Sign-up a new user.
///
/// Params: {
///   name: User's name,
///   password: User's password,
/// }
router.post('/signup', async (req, res) => {
  let { name, password } = req.body;

  // Validate form data
  const errors = validate({name, password});
  if (errors.name.length !== 0 || errors.password.length !== 0) {
    return res.json({success: false, errors});
  }

  try {
    // Insert user
    await db.query(insertUser(name, password));

    // Get JWT
    const user = {name, password};
    const token = jwt.sign({user}, JWT_SECRET, {expiresIn: '24h'});

    // Success!
    res.json({success: true, token});
  } catch (err) {
    if (err.constraint === 'users_name_key') {
      // Database error indicates that username is not unique
      const errors = {name: ['Username is already taken.']};
      res.json({success: false, errors});
    } else {
      // Unknown error
      const errors = {form: [err]};
      res.json({success: false, errors});
      console.log(err);
    }
  }
});

/// Get a JWT token for the user (Login).
///
/// Params: {
///   name: User's name,
///   password: User's password,
/// }
router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Fetch user from database
    const result = await db.query(getUser(name));
    const user = result.rows[0];

    // Check credentials
    if (!user || user.password !== password) {
      const errors = {form: ['Username/ password pair not found.']};
      return res.json({success: false, errors});
    }

    // Get JWT
    const token = jwt.sign({user}, JWT_SECRET, {expiresIn: '24h'});

    // Success!
    res.json({success: true, token});
  } catch (err) {
    // Unknown error
    const errors = {form: [err]};
    res.json({success: false, errors});
    console.log(err);
  }
});

router.get('/verify', (req, res) => {
  if (req.user) {
    res.json({success: true, user: req.user});
  } else {
    res.json({success: false});
  }
});

const insertUser = (name, password) => ({
  text: `
    INSERT INTO users(name, password)
    VALUES ($1, $2);
  `,
  values: [name, password],
});

const getUser = (name) => ({
  text: `
    SELECT * from users
    WHERE name = $1;
  `,
  values: [name],
});

module.exports = router;
