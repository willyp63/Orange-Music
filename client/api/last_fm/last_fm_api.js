import { isEmpty, isNotEmpty } from '../../util/empty';
import { getUrlWithUpdatedParams } from '../../util/url';
import { makeFakeId } from '../../util/id';
import { LAST_FM_API_KEY } from '../../secrets/api_keys';
import { EMPTY_IMG_SRC } from '../../util/image';

const DEFAULT_PAGE_SIZE = 50;
module.exports.DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;

/// Base url and url params for making all requests.
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const BASE_URL_PARAMS = {
  api_key: LAST_FM_API_KEY,
  format: 'json'
};

/// Supported Last FM query types.
///
/// See (http://www.last.fm/api).
const QUERY_TYPE = Object.freeze({
  SEARCH: 0,
  GET_INFO: 1,
  TOP_TRACKS: 2
});

/// Preforms a search query.
///
/// Returns a list a search results.
module.exports.search = ({query, page, pageSize}) => {
  return genericQuery({
    queryType: QUERY_TYPE.SEARCH,
    query: query,
    page: page,
    pageSize: pageSize
  });
}

/// Fetches top tracks from last fm.
module.exports.topTracks = ({page, pageSize}) => {
  return genericQuery({
    queryType: QUERY_TYPE.TOP_TRACKS,
    page: page,
    pageSize: pageSize
  });
}

/// Preforms a getInfo query, which returns more fields than a search query.
///
/// Returns a single object with the entities info.
module.exports.getInfo = ({mbid, trackName, artistName}) => {
  return genericQuery({
    queryType: QUERY_TYPE.GET_INFO,
    mbid: mbid,
    query: trackName,
    artistName: artistName
  });
}

module.exports.getImageUrl = (image, preferredIdx) => {
  if (preferredIdx >= image.length) {
    preferredIdx = image.length - 1;
  }
  for (let i = preferredIdx; i >= 0; i--) {
    const url = image[i]['#text'];
    if (isNotEmpty(url)) {
      return url;
    }
  }
  return
}

/// Preforms a Last FM query with the given params.
const genericQuery = (params) => {
  return getQueryParams(params).then((queryParams) => {
    return makeQuery(params.queryType, queryParams);
  });
}

const getQueryParams = ({queryType, query, artistName, mbid, page, pageSize}) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(queryType)) {
      return reject('QueryType must not be empty.');
    }

    const queryParams = Object.assign({}, BASE_URL_PARAMS);
    switch (queryType) {
      case QUERY_TYPE.SEARCH:
        if (isEmpty(query)) {
          return reject('Query must not be empty.');
        }
        queryParams.track = query;
        queryParams.method = 'track.search';
        queryParams.page = isNotEmpty(page)
          ? page
          : 1;
        queryParams.limit = isNotEmpty(pageSize)
          ? pageSize
          : DEFAULT_PAGE_SIZE;
        break;
      case QUERY_TYPE.GET_INFO:
        if (isNotEmpty(mbid)) {
          queryParams.mbid = mbid;
        } else {
          // Must provide mbid or query and artistName.
          if (isEmpty(query) || isEmpty(artistName)) {
            return reject(
              'Missing one of the required params: mbid, query, or artistName.'
            );
          }
          queryParams.track = query;
          queryParams.artist = artistName;
        }
        queryParams.method = 'track.getInfo';
        break;
      case QUERY_TYPE.TOP_TRACKS:
        queryParams.method = 'chart.gettoptracks';
        queryParams.page = isNotEmpty(page)
          ? page
          : 1;
        queryParams.limit = isNotEmpty(pageSize)
          ? pageSize
          : DEFAULT_PAGE_SIZE;
        break;
    }
    resolve(queryParams);
  });
}

const makeQuery = (queryType, queryParams) => {
  return new Promise((resolve, reject) => {
    $.get(getUrlWithUpdatedParams(BASE_URL, queryParams), (response) => {
      switch (queryType) {
        case QUERY_TYPE.SEARCH:
          return resolve({
            tracks: formatTracksFromApi(response.results.trackmatches.track),
            total: parseInt(response.results['opensearch:totalResults']),
            page: response.results['opensearch:startIndex'] /
                response.results['opensearch:itemsPerPage']
          });
        case QUERY_TYPE.GET_INFO:
          return resolve(response.track);
        case QUERY_TYPE.TOP_TRACKS:
          return resolve({
            tracks: formatTracksFromApi(response.tracks.track),
            total: parseInt(response.tracks['@attr'].total),
            page: parseInt(response.tracks['@attr'].page)
          });
      }
    }).fail((err) => {
      reject(`Error making last fm api request: ${err}`);
    });
  });
}

const formatTracksFromApi = (tracks) => {
  const takenIds = {};
  const formattedTracks = [];
  tracks.forEach((track) => {
    // format id
    track.mbid = track.mbid || makeFakeId();
    if (takenIds[track.mbid]) { return; }
    takenIds[track.mbid] = true;

    // format artist
    if (typeof track.artist === 'string') {
      track.artist = {name: track.artist};
    }

    formattedTracks.push(track);
  });
  return formattedTracks;
}
