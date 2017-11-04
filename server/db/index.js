const { Pool } = require('pg');
const connectionString = require('./connection_str');

const pool = new Pool({connectionString});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};
