const createTables = require('./create_tables');
const populate = require('./populate');

module.exports = (async () => {
  await createTables();
  await populate();
});