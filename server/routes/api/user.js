const router = require('express').Router();
const jwt = require('jsonwebtoken');
const validate = require('../../../shared/validators/signup');
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

  console.log(req.body);
  try {
    await db.query(insertUser(name, password));
    res.json({success: true});
  } catch (err) {
    if (err.constraint === 'users_name_key') {
      // Database error indicates that username is not unique.
      const errors = {name: ['Username is already taken.']};
      res.json({success: false, errors});
    } else {
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
    const result = await db.query(getUser(name));
    const user = result.rows[0];

    if (!user || user.password !== password) {
      const errors = {form: ['Username/ password pair not found.']};
      return res.json({success: false, errors});
    }

    var token = jwt.sign({user}, JWT_SECRET, {expiresIn: '24h'});

    res.json({success: true, token});
  } catch (e) {
    console.log(e);
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
