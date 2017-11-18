const createTable = () => `
  CREATE TABLE IF NOT EXISTS playlist_adds(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users,
    playlist_id integer REFERENCES playlists,
    track_id integer REFERENCES tracks,
    is_static boolean,
    UNIQUE(playlist_id, track_id)
  );
`;

const insert = (userId, playlistId, trackId, isStatic = false) => ({
  text: `
    INSERT INTO playlist_adds(user_id, playlist_id, track_id, is_static)
    VALUES ($1, $2, $3, $4);
  `,
  values: [userId, playlistId, trackId, isStatic],
});

const remove = (userId, playlistId, trackId) => ({
  text: `
    DELETE FROM playlist_adds
    WHERE user_id = $1 AND playlist_id = $2 AND track_id = $3;
  `,
  values: [userId, playlistId, trackId],
});

const removeAllForPlaylist = (userId, playlistId) => ({
  text: `
    DELETE FROM playlist_adds
    WHERE user_id = $1 AND playlist_id = $2;
  `,
  values: [userId, playlistId],
});

module.exports = {
  createTable,
  insert,
  remove,
  removeAllForPlaylist,
  toString: () => 'playlist add',
};
