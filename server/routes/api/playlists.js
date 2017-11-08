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
    res.json({success: false, errors: {unknown: [err]}});
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
      res.json({success: false, errors: {name: [err]}});
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
