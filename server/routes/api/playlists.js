const router = require('express').Router();
const db = require('../../db');
const validate = require('../../../shared/validators/create_playlist');

const AUTH_ERRORS = {name: ['Failed to provide valid auth token.']};

/// Require auth token.
router.use((req, res, next) => {
  if (!req.user) {
    const errors = Object.assign({}, AUTH_ERRORS);
    res.json({success: false, errors});
  } else {
    next();
  }
});

/// Get a user's playlists
router.get('/', async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await db.query(getPlaylistsForUser(userId));
    const playlists = result.rows.map(formatPlaylistRow);

    // Success!
    res.json({success: true, playlists});
  } catch (err) {
    res.json({success: false, errors: {unknown: [err.toString()]}});
  }
});

/// Get the tracks on a user's playlist
///
/// Params: {
///   playlistId: Playlist's name,
/// }
router.get('/tracks/:playlistId', async (req, res) => {
  const userId = req.user.id;
  const playlistId = req.params.playlistId;

  try {
    const result = await db.query(getTracksOnUsersPlaylist(userId, playlistId));
    const tracks = result.rows.map(formatTrackRow);

    // Success!
    res.json({success: true, tracks});
  } catch (err) {
    res.json({success: false, errors: {unknown: [err.toString()]}});
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
  const errors = validate({name});
  if (errors.name.length !== 0) {
    return res.json({success: false, errors});
  }

  try {
    // Insert playlist
    await db.query(insertPlaylist(userId, name));
    res.json({success: true});
  } catch (err) {
    if (err.constraint === 'playlists_user_id_name_key') {
      // Database error indicates that name is not unique
      const errors = {name: ['Name is already taken.']};
      res.json({success: false, errors});
    } else {
      res.json({success: false, errors: {name: [err.toString()]}});
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
    await db.query(removePlaylistAddsForPlaylist(userId, playlist.id));
  } catch (err) {
    console.log(err);
    return res.json({success: false, errors: {playlist: [err.toString()]}});
  }

  // Delete Playlist
  try {
    await db.query(removePlaylist(userId, playlist.id));
    res.json({success: true});
  } catch (err) {
    console.log(err);
    return res.json({success: false, errors: {playlist: [err.toString()]}});
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
  } catch (err) {
    if (err.constraint === 'tracks_name_artist_name_key') {
      // Database error indicates that track is already in table.
      //
      // Do nothing, this is fine.
    } else {
      console.log(err);
      return res.json({success: false, errors: {playlist: [err.toString()]}});
    }
  }

  // Fetch Track
  try {
    const result = await db.query(getTrack(track.name, track.artistName));
    track = result.rows[0];
  } catch (err) {
    console.log(err);
    return res.json({success: false, errors: {playlist: [err.toString()]}});
  }

  // Add to Playlist
  try {
    await db.query(insertPlaylistAdd(userId, playlist.id, track.id));
    res.json({success: true});
  } catch (err) {
    if (err.constraint === 'playlist_adds_playlist_id_track_id_key') {
      // Database error indicates that track is already added to playlist.
      const errors = {playlist: ['Already contains track.']};
      res.json({success: false, errors});
    } else {
      console.log(err);
      res.json({success: false, errors: {playlist: [err.toString()]}});
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

  // Remove Playlist Add
  try {
    await db.query(removePlaylistAdd(userId, playlist.id, track.id));
    res.json({success: true});
  } catch (err) {
    console.log(err);
    return res.json({success: false, errors: {playlist: [err.toString()]}});
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

const removePlaylistAddsForPlaylist = (userId, playlistId) => ({
  text: `
    DELETE FROM playlist_adds
    WHERE user_id = $1 AND playlist_id = $2;
  `,
  values: [userId, playlistId],
});

const getPlaylistsForUser = (userId) => ({
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

const getTracksOnUsersPlaylist = (userId, playlistId) => ({
  text: `
    SELECT tracks.* FROM playlist_adds
    JOIN tracks ON playlist_adds.track_id = tracks.id
    WHERE playlist_adds.user_id = $1 AND playlist_adds.playlist_id = $2;
  `,
  values: [userId, playlistId],
});

const formatPlaylistRow = (row) => ({
  id: row.id,
  name: row.name,
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
