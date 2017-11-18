const createTable = () => `
  CREATE TABLE IF NOT EXISTS tracks(
    id SERIAL PRIMARY KEY,
    mbid text,
    name text,
    artist_name text,
    image JSONB,
    UNIQUE(name, artist_name)
  );
`;

const insert = (mbid, name, artistName, image) => ({
  text: `
    INSERT INTO tracks(mbid, name, artist_name, image)
    VALUES ($1, $2, $3, $4);
  `,
  values: [mbid, name, artistName, JSON.stringify(image)],
});

const get = (name, artistName) => ({
  text: `
    SELECT * FROM tracks
    WHERE name = $1 AND artist_name = $2;
  `,
  values: [name, artistName],
});

const getAllForPlaylist = (playlistId) => ({
  text: `
    SELECT tracks.*, playlist_adds.is_static FROM playlist_adds
    JOIN tracks ON playlist_adds.track_id = tracks.id
    WHERE playlist_adds.playlist_id = $1;
  `,
  values: [playlistId],
});

module.exports = {
  createTable,
  insert,
  get,
  getAllForPlaylist,
  toString: () => 'track',
};
