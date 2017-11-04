const { Client } = require('pg');
const connectionString = require('./connection_str');

const createUsers = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name text UNIQUE CHECK (char_length(name) >= 1),
    password text CHECK (char_length(password) >= 6)
  );
`;

const createPlaylists = `
  CREATE TABLE IF NOT EXISTS playlists(
    id SERIAL PRIMARY KEY,
    userId integer REFERENCES users,
    name text UNIQUE
  );
`;

const createTracks = `
  CREATE TABLE IF NOT EXISTS tracks(
    id SERIAL PRIMARY KEY,
    name text,
    artistName text,
    image JSONB,
    UNIQUE(name, artistName)
  );
`;

const createPlaylistAdds = `
  CREATE TABLE IF NOT EXISTS playlistAdds(
    id SERIAL PRIMARY KEY,
    playlistId integer REFERENCES playlists,
    trackId integer REFERENCES tracks,
    UNIQUE(playlistId, trackId)
  );
`;

module.exports = (async () => {
  const client = new Client({connectionString});
  await client.connect();

  try {
    await client.query(createUsers);
    await client.query(createPlaylists);
    await client.query(createTracks);
    await client.query(createPlaylistAdds);
  } finally {
    await client.end();
  }
});
