import { getUrlWithUpdatedParams } from '../../util/url';

module.exports.getVideo = ({query, artistQuery, duration}) => {
  return new Promise((resolve, reject) => {
    const url = getUrlWithUpdatedParams('/video', {
      q: query,
      aq: artistQuery,
      dur: duration
    });
    $.get(url, resolve).fail(reject);
  });
}
