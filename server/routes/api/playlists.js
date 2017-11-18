const router = require('express').Router();
const db = require('../../db');
const validateCreatePlaylist = require('../../../shared/validators/create_playlist');


/// Get top playlists.
router.get('/top', async (req, res) => {
  try {
    const userId = (await db.query(getUser('Guest'))).rows[0].id;
    const playlists = (await db.query(getPlaylists(userId))).rows;
    res.json({success: true, playlists});
  } catch (e) {
    console.log('!!! Problem getting top playlists !!!');
    console.log(e);
  }
});

/// Get the tracks on a user's playlist
///
/// Params: {
///   playlistId: Playlist's id,
/// }
router.get('/tracks/:playlistId', async (req, res) => {
  const playlistId = req.params.playlistId;

  try {
    const tracks = (await db.query(getTracks(playlistId))).rows.map(formatTrackRow);
    res.json({success: true, tracks});
  } catch (e) {
    console.log('!!! Problem getting tracks on users playlist !!!');
    console.log(e);
  }
});

// Require auth.
router.use((req, res, next) => {
  if (!req.user) {
    const errors = {name: ['Failed to provide valid auth token.']};
    res.json({success: false, errors});
  } else {
    next();
  }
});


/// Get a user's playlists.
router.get('/', async (req, res) => {
  const userId = req.user.id;

  try {
    const playlists = (await db.query(getPlaylists(userId))).rows;
    res.json({success: true, playlists});
  } catch (e) {
    console.log('!!! Problem getting users playlists !!!');
    console.log(e);
  }
});

/// Create a playlist for a user
///
/// Params: {
///   name: Playlist's name,
/// }
router.post('/create', async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  // Validate form data
  const errors = validateCreatePlaylist({name});
  if (!errors.valid) { return res.json({success: false, errors}); }

  try {
    await db.query(insertPlaylist(userId, name));
    res.json({success: true});
  } catch (e) {
    if (e.constraint === 'playlists_user_id_name_key') {
      // Database error indicates that name is not unique
      const errors = {name: ['Name is already taken.']};
      res.json({success: false, errors});
    } else {
      console.log('!!! Problem creating playlist !!!');
      console.log(e);
    }
  }
});

/// Delete a User's Playlist
///
/// Params: {
///   playlist: Playlist to delete,
/// }
router.post('/delete', async (req, res) => {
  const userId = req.user.id;
  let { playlist } = req.body;

  // Delete Playlist Adds for Playlist
  try {
    await db.query(removePlaylistAdds(userId, playlist.id));
  } catch (e) {
    console.log('!!! Problem removing playlist adds, while removing playlist !!!');
    console.log(e);
  }

  // Delete Playlist
  try {
    await db.query(removePlaylist(userId, playlist.id));
    res.json({success: true});
  } catch (err) {
    console.log('!!! Problem while removing playlist !!!');
    console.log(e);
  }
});

/// Add a track to a user's playlist
///
/// Params: {
///   playlist: Playlist to add to,
///   track: Track to add,
/// }
router.post('/addto', async (req, res) => {
  const userId = req.user.id;
  let { playlist, track } = req.body;

  // Insert Track
  try {
    await db.query(insertTrack(track.mbid, track.name, track.artistName, track.image));
  } catch (e) {
    if (e.constraint === 'tracks_name_artist_name_key') {
      // Database error indicates that track is already in table.
      //
      // Do nothing, this is fine.
    } else {
      console.log('!!! Problem adding track to table, while adding track to playlist !!!');
      console.log(e);
    }
  }

  // Fetch Track
  try {
    track = (await db.query(getTrack(track.name, track.artistName))).rows[0];
  } catch (err) {
    console.log('!!! Problem fetching track, while adding track to playlist !!!');
    console.log(e);
  }

  // Add to Playlist
  try {
    await db.query(insertPlaylistAdd(userId, playlist.id, track.id));
    res.json({success: true});
  } catch (e) {
    if (e.constraint === 'playlist_adds_playlist_id_track_id_key') {
      // Database error indicates that track is already added to playlist.
      const errors = {playlist: ['Already contains track.']};
      res.json({success: false, errors});
    } else {
      console.log('!!! Problem while adding track to playlist !!!');
      console.log(e);
    }
  }
});

/// Remove a track from a user's playlist
///
/// Params: {
///   playlist: Playlist to remove from,
///   track: Track to remove,
/// }
router.post('/removefrom', async (req, res) => {
  const userId = req.user.id;
  let { playlist, track } = req.body;

  try {
    await db.query(removePlaylistAdd(userId, playlist.id, track.id));
    res.json({success: true});
  } catch (err) {
    console.log('!!! Problem while removing track from playlist !!!');
    console.log(e);
  }
});


const insertPlaylist = (userId, name) => ({
  text: `
    INSERT INTO playlists(user_id, name)
    VALUES ($1, $2);
  `,
  values: [userId, name],
});

const removePlaylist = (userId, playlistId) => ({
  text: `
    DELETE FROM playlists
    WHERE user_id = $1 AND id = $2;
  `,
  values: [userId, playlistId],
});

const insertTrack = (mbid, name, artistName, image) => ({
  text: `
    INSERT INTO tracks(mbid, name, artist_name, image)
    VALUES ($1, $2, $3, $4);
  `,
  values: [mbid, name, artistName, image],
});

const insertPlaylistAdd = (userId, playlistId, trackId) => ({
  text: `
    INSERT INTO playlist_adds(user_id, playlist_id, track_id)
    VALUES ($1, $2, $3);
  `,
  values: [userId, playlistId, trackId],
});

const removePlaylistAdd = (userId, playlistId, trackId) => ({
  text: `
    DELETE FROM playlist_adds
    WHERE user_id = $1 AND playlist_id = $2 AND track_id = $3;
  `,
  values: [userId, playlistId, trackId],
});

const removePlaylistAdds = (userId, playlistId) => ({
  text: `
    DELETE FROM playlist_adds
    WHERE user_id = $1 AND playlist_id = $2;
  `,
  values: [userId, playlistId],
});

const getPlaylists = (userId) => ({
  text: `
    SELECT * FROM playlists
    WHERE user_id = $1;
  `,
  values: [userId],
});

const getTrack = (name, artistName) => ({
  text: `
    SELECT * FROM tracks
    WHERE name = $1 AND artist_name = $2;
  `,
  values: [name, artistName],
});

const getTracks = (playlistId) => ({
  text: `
    SELECT tracks.* FROM playlist_adds
    JOIN tracks ON playlist_adds.track_id = tracks.id
    WHERE playlist_adds.playlist_id = $1;
  `,
  values: [playlistId],
});

const getUser = (name) => ({
  text: `
    SELECT * from users
    WHERE name = $1;
  `,
  values: [name],
});

const formatTrackRow = (row) => ({
  id: row.id,
  mbid: row.mbid,
  name: row.name,
  artist: {
    name: row.artist_name,
  },
  image: row.image,
});

module.exports = router;
