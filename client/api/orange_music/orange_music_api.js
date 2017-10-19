import { getUrlWithUpdatedParams } from '../../util/url';

module.exports.getVideo = ({query, artistQuery, duration}) => {
  return new Promise((resolve, reject) => {
    const queryParams = {
      q: query,
      aq: artistQuery,
      dur: duration
    };
    $.get(getUrlWithUpdatedParams('/video', queryParams), (response) => {
      if (response.err) { reject(response.err); }
      resolve(response);
    }).fail((err) => {
      reject(`Error making orange music request: ${err}`);
    });
  });
}
