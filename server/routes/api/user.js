const router = require('express').Router();
const validate = require('../../../shared/validators/signup');
const db = require('../../db');

const insertUser = (name, password) => ({
  text: `
    INSERT INTO users(name, password)
    VALUES ($1, $2);
  `,
  values: [name, password],
});

/// Sign-up a new user.
///
/// Params: {
///   name: User's name,
///   password: User's password,
/// }
router.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  // Validate form data
  const formErrors = validate({name, password});
  if (formErrors.name.length !== 0 || formErrors.password.length !== 0) {
    return res.end(JSON.stringify({formErrors}));
  }

  try {
    await db.query(insertUser(name, password));
    res.end(JSON.stringify({msg: 'Success!'}));
  } catch (err) {
    if (err.constraint === 'users_name_key') {
      res.end(JSON.stringify({formErrors: {name: ['Username is already taken.']}}));
    } else {
      res.end(JSON.stringify({formErrors: {name: ['Unknown error. Please try again.']}}));
    }
  }
});

module.exports = router;
