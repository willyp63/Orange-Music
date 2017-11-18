const db = require('../index.js');

module.exports = (async () => {
  const models = [
    require('../models/user'),
    require('../models/playlist'),
    require('../models/track'),
    require('../models/playlist_add'),
  ];

  const client = await db.getClient();

  try {
    await client.query('BEGIN');
    for (let i = 0; i < models.length; i++) {
      console.log(`Creating ${models[i].toString()} table.`);
      await client.query(models[i].createTable());
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    process.exit(1);
  } finally {
    await client.release();
  }
});
