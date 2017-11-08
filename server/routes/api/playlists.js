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

/// Add a track to a user's playlist
///
/// Params: {
///   playlist: Playlist to add to,
///   track: Track to add,
/// }
router.post('/addto', async (req, res) => {
  const userId = req.user.id;
  const { playlist, track } = req.body;

  console.log(req.body);

  // Insert Track
  try {
    await db.query(insertTrack(track.name, track.artistName, track.image));
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

  // Add to Playlist
  try {
    await db.query(insertPlaylistAdd(playlist.id, track.id));
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

const insertPlaylist = (userId, name) => ({
  text: `
    INSERT INTO playlists(user_id, name)
    VALUES ($1, $2);
  `,
  values: [userId, name],
});

const insertTrack = (name, artistName, image) => ({
  text: `
    INSERT INTO tracks(name, artist_name, image)
    VALUES ($1, $2, $3);
  `,
  values: [name, artistName, image],
});

const insertPlaylistAdd = (playlistId, trackId) => ({
  text: `
    INSERT INTO playlist_adds(playlist_id, track_id)
    VALUES ($1, $2);
  `,
  values: [playlistId, trackId],
});

const getPlaylistsForUser = (userId) => ({
  text: `
    SELECT * from playlists
    WHERE user_id = $1;
  `,
  values: [userId],
});

const formatPlaylistRow = (row) => ({
  id: row.id,
  name: row.name,
});

module.exports = router;
