const createTables = require('./create_tables');

module.exports = (async () => {
  await createTables();
});
