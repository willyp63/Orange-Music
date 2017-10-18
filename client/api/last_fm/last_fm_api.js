import { isEmpty, isNotEmpty } from '../../util/empty';
import { getUrlWithUpdatedParams } from '../../util/url';
import { makeFakeId } from '../../util/id';
import { LAST_FM_API_KEY } from '../../secrets/api_keys';

module.exports.DEFAULT_PAGE_SIZE = 10;

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
  GET_INFO: 1
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
          : null;
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
            tracks: formatSearchResults(response.results.trackmatches.track),
            total: parseInt(response.results['opensearch:totalResults']),
            page: response.results['opensearch:startIndex'] /
                response.results['opensearch:itemsPerPage']
          });
        case QUERY_TYPE.GET_INFO:
          return resolve(response.track);
      }
    }).fail((err) => {
      reject(`Error making last fm api request: ${err}`);
    });
  });
}

const formatSearchResults = (results) => {
  const takenIds = {};
  const mappedResults = [];
  results.forEach((result) => {
    result.mbid = result.mbid || makeFakeId();
    if (takenIds[result.mbid]) { return; }
    takenIds[result.mbid] = true;
    mappedResults.push(result);
  });
  return mappedResults;
}
