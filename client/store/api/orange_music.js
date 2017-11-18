import { getUrlWithUpdatedParams } from '../../util/url';

const API_BASE_URL = '/api/v1';

/// STREAM
module.exports.getVideo = ({query, artistQuery}) =>
  get('/stream/video', {q: query, aq: artistQuery});


/// USER
module.exports.signUp = ({name, password}) =>
  post('/user/signup', {name, password});

module.exports.logIn = ({name, password}) =>
  post('/user/login', {name, password});

module.exports.verify = ({token}) =>
  get('/user/verify', {token});


/// PLAYLISTS
module.exports.getPlaylists = ({token}) =>
  get('/playlists', {token});

module.exports.topPlaylists = () => get('/playlists/top');

module.exports.getPlaylistTracks = ({token, playlistId}) =>
  get(`/playlists/tracks/${playlistId}`, {token});

module.exports.createPlaylist = ({token, name}) =>
  post('/playlists/create', {token, name});

module.exports.deletePlaylist = ({token, playlist}) =>
  post('/playlists/delete', {token, playlist});

module.exports.addToPlaylist = ({token, playlist, track}) =>
  post('/playlists/addto', {token, playlist, track});

module.exports.removeFromPlaylist = ({token, playlist, track}) =>
  post('/playlists/removefrom', {token, playlist, track});


const post = (query, queryParams) => {
  return new Promise((resolve, reject) => {
    $.post({
      url: `${API_BASE_URL}${query}`,
      data: JSON.stringify(queryParams),
      success: resolve,
      error: reject,
      contentType: 'application/json',
    });
  });
};

const get = (query, queryParams) => {
  return new Promise((resolve, reject) => {
    const url = getUrlWithUpdatedParams(`${API_BASE_URL}${query}`, queryParams || {});
    $.get(url, resolve).fail(reject);
  });
};
