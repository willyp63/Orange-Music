const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/orange_music';

const pool = new Pool({connectionString});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};
