import { getUrlWithUpdatedParams } from '../../util/url';

/// STREAM
module.exports.getVideo = ({query, artistQuery}) => {
  return new Promise((resolve, reject) => {
    const url = getUrlWithUpdatedParams('/api/v1/stream/video', {
      q: query,
      aq: artistQuery
    });
    $.get(url, resolve).fail(reject);
  });
};


/// USER
module.exports.signUp = ({name, password}) => {
  return new Promise((resolve, reject) => {
    const data = {name, password};
    $.post({
      url: '/api/v1/user/signup',
      data: JSON.stringify(data),
      success: resolve,
      error: reject,
      contentType: 'application/json',
    });
  });
};

module.exports.logIn = ({name, password}) => {
  return new Promise((resolve, reject) => {
    const data = {name, password};
    $.post({
      url: '/api/v1/user/login',
      data: JSON.stringify(data),
      success: resolve,
      error: reject,
      contentType: 'application/json',
    });
  });
};

module.exports.verify = ({token}) => {
  return new Promise((resolve, reject) => {
    const url = getUrlWithUpdatedParams('/api/v1/user/verify', {token});
    $.get(url, resolve).fail(reject);
  });
};


/// PLAYLISTS
module.exports.getPlaylists = ({token}) => {
  return new Promise((resolve, reject) => {
    const url = getUrlWithUpdatedParams('/api/v1/playlists', {token});
    $.get(url, resolve).fail(reject);
  });
};

module.exports.getPlaylistTracks = ({token, playlistId}) => {
  return new Promise((resolve, reject) => {
    const url = getUrlWithUpdatedParams(`/api/v1/playlists/tracks/${playlistId}`, {token});
    $.get(url, resolve).fail(reject);
  });
};

module.exports.createPlaylist = ({token, name}) => {
  return new Promise((resolve, reject) => {
    const data = {token, name};
    $.post({
      url: '/api/v1/playlists/create',
      data: JSON.stringify(data),
      success: resolve,
      error: reject,
      contentType: 'application/json',
    });
  });
};

module.exports.deletePlaylist = ({token, playlist}) => {
  return new Promise((resolve, reject) => {
    const data = {token, playlist};
    $.post({
      url: '/api/v1/playlists/delete',
      data: JSON.stringify(data),
      success: resolve,
      error: reject,
      contentType: 'application/json',
    });
  });
};

module.exports.addToPlaylist = ({token, playlist, track}) => {
  return new Promise((resolve, reject) => {
    const data = {token, playlist, track};
    $.post({
      url: '/api/v1/playlists/addto',
      data: JSON.stringify(data),
      success: resolve,
      error: reject,
      contentType: 'application/json',
    });
  });
};

module.exports.removeFromPlaylist = ({token, playlist, track}) => {
  return new Promise((resolve, reject) => {
    const data = {token, playlist, track};
    $.post({
      url: '/api/v1/playlists/removefrom',
      data: JSON.stringify(data),
      success: resolve,
      error: reject,
      contentType: 'application/json',
    });
  });
};
