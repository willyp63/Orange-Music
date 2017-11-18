const createTable = () => `
  CREATE TABLE IF NOT EXISTS playlists(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users,
    name text CHECK (char_length(name) >= 1),
    images JSONB,
    is_static boolean,
    UNIQUE(user_id, name)
  );
`;

const insert = (userId, name, isStatic = false) => ({
  text: `
    INSERT INTO playlists(user_id, name, is_static)
    VALUES ($1, $2, $3);
  `,
  values: [userId, name, isStatic],
});

const remove = (userId, playlistId) => ({
  text: `
    DELETE FROM playlists
    WHERE user_id = $1 AND id = $2;
  `,
  values: [userId, playlistId],
});

const get = (userId, name) => ({
  text: `
    SELECT * FROM playlists
    WHERE user_id = $1 AND name = $2;
  `,
  values: [userId, name],
});

const getAllForUser = (userId) => ({
  text: `
    SELECT * FROM playlists
    WHERE user_id = $1;
  `,
  values: [userId],
});

const getAllStatic = () => ({
  text: `
    SELECT * FROM playlists
    WHERE is_static = true;
  `,
  values: [],
});

const setImages = (playlistId, images) => ({
  text: `
    UPDATE playlists
    SET images = $2
    WHERE id = $1;
  `,
  values: [playlistId, JSON.stringify(images)],
});

module.exports = {
  createTable,
  insert,
  remove,
  get,
  getAllForUser,
  setImages,
  getAllStatic,
  toString: () => 'playlist',
};
