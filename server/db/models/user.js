const createTable = () => `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name text UNIQUE CHECK (char_length(name) >= 1),
    password text CHECK (char_length(password) >= 6)
  );
`;

const insert = (name, password) => ({
  text: `
    INSERT INTO users(name, password)
    VALUES ($1, $2);
  `,
  values: [name, password],
});

const get = (name) => ({
  text: `
    SELECT * from users
    WHERE name = $1;
  `,
  values: [name],
});

module.exports = {
  createTable,
  insert,
  get,
  toString: () => 'user',
};
