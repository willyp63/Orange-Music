const User = require('../../models/user');

const GUEST_USER_NAME = 'Guest';
const GUEST_PASSWORD = 'abc123';

module.exports = (async (client) => {
  try {
    console.log(`\n\nCreating Guest User.`);

    await client.query(User.insert(GUEST_USER_NAME, GUEST_PASSWORD));
  } catch (e) {
    if (e.constraint === 'users_name_key') {
      // Do nothing. Guest user already exists.
    } else {
      console.error(e);
      process.exit(1);
    }
  }
});
