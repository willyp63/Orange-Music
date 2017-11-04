import { getUrlWithUpdatedParams } from '../../util/url';

module.exports.getVideo = ({query, artistQuery}) => {
  return new Promise((resolve, reject) => {
    const url = getUrlWithUpdatedParams('/api/v1/stream/video', {
      q: query,
      aq: artistQuery
    });
    $.get(url, resolve).fail(reject);
  });
};

module.exports.signup = ({name, password}) => {
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
