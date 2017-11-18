const router = require('express').Router();
const db = require('../../db');
const validateCreatePlaylist = require('../../../shared/validators/create_playlist');
const Playlist = require('../../db/models/playlist');
const Track = require('../../db/models/track');
const PlaylistAdd = require('../../db/models/playlist_add');
const User = require('../../db/models/user');


/// Get top playlists.
router.get('/top', async (req, res) => {
  try {
    const playlists = (await db.query(Playlist.getAllStatic())).rows.map(formatPlaylistRow);
    res.json({success: true, playlists});
  } catch (e) {
    console.error(e);
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
    const tracks = (await db.query(Track.getAllForPlaylist(playlistId))).rows.map(formatTrackRow);
    res.json({success: true, tracks});
  } catch (e) {
    console.error(e);
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
    const playlists = (await db.query(Playlist.getAllForUser(userId))).rows.map(formatPlaylistRow);
    res.json({success: true, playlists});
  } catch (e) {
    console.error(e);
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
    await db.query(Playlist.insert(userId, name));
    res.json({success: true});
  } catch (e) {
    if (e.constraint === 'playlists_user_id_name_key') {
      // Database error indicates that name is not unique
      const errors = {name: ['Name is already taken.']};
      res.json({success: false, errors});
    } else {
      console.error(e);
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
    await db.query(PlaylistAdd.removeAllForPlaylist(userId, playlist.id));
  } catch (e) {
    console.error(e);
  }

  // Delete Playlist
  try {
    await db.query(Playlist.remove(userId, playlist.id));
    res.json({success: true});
  } catch (err) {
    console.error(e);
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
    await db.query(Track.insert(track.mbid, track.name, track.artistName, track.image));
  } catch (e) {
    if (e.constraint === 'tracks_name_artist_name_key') {
      // Database error indicates that track is already in table.
      //
      // Do nothing, this is fine.
    } else {
      console.error(e);
    }
  }

  // Fetch Track
  try {
    track = (await db.query(Track.get(track.name, track.artistName))).rows[0];
  } catch (err) {
    console.error(e);
  }

  // Add to Playlist
  try {
    await db.query(PlaylistAdd.insert(userId, playlist.id, track.id));
    res.json({success: true});
  } catch (e) {
    if (e.constraint === 'playlist_adds_playlist_id_track_id_key') {
      // Database error indicates that track is already added to playlist.
      const errors = {playlist: ['Already contains track.']};
      res.json({success: false, errors});
    } else {
      console.error(e);
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
    await db.query(PlaylistAdd.remove(userId, playlist.id, track.id));
    res.json({success: true});
  } catch (err) {
    console.error(e);
  }
});

const makeStatic = (row) => Object.assign(row, {isStatic: true});

const formatTrackRow = (row) => ({
  id: row.id,
  mbid: row.mbid,
  name: row.name,
  artist: {
    name: row.artist_name,
  },
  image: row.image,
  isStatic: row.is_static,
});

const formatPlaylistRow = (row) => ({
  id: row.id,
  name: row.name,
  images: row.images,
  isStatic: row.is_static,
});

module.exports = router;
