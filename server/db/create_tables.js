const db = require('./index.js');
const createGuestUser = require('./create_guest_user');

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
    user_id integer REFERENCES users,
    name text CHECK (char_length(name) >= 1),
    UNIQUE(user_id, name)
  );
`;

const createTracks = `
  CREATE TABLE IF NOT EXISTS tracks(
    id SERIAL PRIMARY KEY,
    mbid text,
    name text,
    artist_name text,
    image JSONB,
    UNIQUE(name, artist_name)
  );
`;

const createPlaylistAdds = `
  CREATE TABLE IF NOT EXISTS playlist_adds(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users,
    playlist_id integer REFERENCES playlists,
    track_id integer REFERENCES tracks,
    UNIQUE(playlist_id, track_id)
  );
`;

module.exports = (async () => {
  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    // CREATE TABLES
    await client.query(createUsers);
    await client.query(createPlaylists);
    await client.query(createTracks);
    await client.query(createPlaylistAdds);

    // CREATE GUEST USER
    await createGuestUser(client);

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.log('!!! Problem Initiating Database !!!');
    console.log(e);
    process.exit(1);
  } finally {
    await client.release();
    console.log('Database looks good \u2714');
  }
});
