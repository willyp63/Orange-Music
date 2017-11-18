const lastFmApi = require('../../api_util/last_fm');
const User = require('../models/user');
const Playlist = require('../models/playlist');
const Track = require('../models/track');
const PlaylistAdd = require('../models/playlist_add');
const STATIC_PLAYLISTS = require('./static_playlists');

const ADMIN_USER_NAME = 'Admin';
const ADMIN_PASSWORD = 'ornery_for_oranges';

module.exports = (async (client) => {
  try {
    console.log(`\n\nCreating Admin User.`);

    // Insert User
    await client.query(User.insert(ADMIN_USER_NAME, ADMIN_PASSWORD));
    const userId = (await client.query(User.get(ADMIN_USER_NAME))).rows[0].id;

    // Give User Playlists
    for (let i = 0; i < STATIC_PLAYLISTS.length; i++) {
      await createPlaylist(client, userId, STATIC_PLAYLISTS[i].name, STATIC_PLAYLISTS[i].trackQueries.slice(0, 30));
    }
  } catch (e) {
    if (e.constraint === 'users_name_key') {
      // Do nothing. Admin user already exists.
    } else {
      console.error(e);
      process.exit(1);
    }
  }
});

const createPlaylist = async (client, userId, playlistName, trackQuerys) => {
	console.log(`\nCreating playlist ${playlistName}.`);

  // Insert Playlist
	await client.query(Playlist.insert(userId, playlistName, true /* isStatic */));
	const playlistId = (await client.query(Playlist.get(userId, playlistName))).rows[0].id;

  // Add Tracks
  const promises = [];
	for (let i = 0; i < trackQuerys.length; i++) {
		console.log(`Adding track ${trackQuerys[i]} to playlist ${playlistName}.`);
		promises.push(addTrackToPlaylist(client, userId, playlistId, trackQuerys[i]));
	}
  await Promise.all(promises);

  await populatePlaylistImages(client, playlistId);
};

const populatePlaylistImages = async (client, playlistId) => {
  // Get Playlist's Tracks
  const tracks = (await client.query(Track.getAllForPlaylist(playlistId))).rows;

  // Get First Four Tracks with Images
  const playlistImages = [];
  const seenFirstImages = [];
  for (let i = 0; i < tracks.length; i++) {
    const firstImage = tracks[i].image[0]['#text'];
    if (firstImage && !seenFirstImages.includes(firstImage)) {
      seenFirstImages.push(firstImage);
      playlistImages.push(tracks[i].image);
    }
  }

  // Set Playlist Images.
  await client.query(Playlist.setImages(playlistId, playlistImages));
}


const addTrackToPlaylist = async (client, userId, playlistId, trackQuery) => {
	let track = (await lastFmApi.searchTracks({query: trackQuery, pageSize: 1})).tracks[0];

	if (!track) {
    // Couldn't find the track on LastFm.
    //
    // Playlist will be short a track, but this should be ok.
    return;
  }

  // Insert Track
  try {
    await client.query(Track.insert(track.mbid, track.name, track.artist.name, track.image));
  } catch (e) {
    if (e.constraint === 'tracks_name_artist_name_key') {
      // Database error indicates that track is already in table.
      //
      // Do nothing, this is fine.
    } else {
      throw e;
    }
  }

  // Fetch Track
  track = (await client.query(Track.get(track.name, track.artist.name))).rows[0];

  // Insert Playlist Add
  try {
    await client.query(PlaylistAdd.insert(userId, playlistId, track.id, true /* isStatic */));
  } catch (e) {
    if (e.constraint === 'playlist_adds_playlist_id_track_id_key') {
      // Database error indicates that track is already added to playlist.
      //
      // Do nothing, this is fine.
    } else {
      throw e;
    }
  }
}
