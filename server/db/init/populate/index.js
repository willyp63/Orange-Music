const db = require('../../index.js');
const createAdminUser = require('./create_admin_user');
const createGuestUser = require('./create_guest_user');

module.exports = (async () => {
  const client = await db.getClient();
  
  await createAdminUser(client);
	await createGuestUser(client);
});
