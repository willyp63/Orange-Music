import { isEmpty, isNotEmpty } from '../../util/empty';
import { getUrlWithUpdatedParams } from '../../util/url';
import { makeFakeId } from '../../util/id';
import { LAST_FM_API_KEY } from '../../secrets/api_keys';

const LAST_FM_ENTITY_TYPES = {
  TRACK: 0,
  ARTIST: 1,
};
module.exports.LAST_FM_ENTITY_TYPES = LAST_FM_ENTITY_TYPES;

const DEFAULT_PAGE_SIZE = 30;
module.exports.DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;

const LAST_FM_QUERY_TYPES = {
  SEARCH_TRACKS: 0,
  SEARCH_ARTISTS: 1,
  TOP_TRACKS: 2,
  TOP_ARTISTS: 3,
};
module.exports.LAST_FM_QUERY_TYPES = LAST_FM_QUERY_TYPES;

module.exports.searchTracks = ({query, page, pageSize}) => {
  return genericQuery(
    LAST_FM_QUERY_TYPES.SEARCH_TRACKS,
    {query, page, pageSize});
}

module.exports.searchArtists = ({query, page, pageSize}) => {
  return genericQuery(
    LAST_FM_QUERY_TYPES.SEARCH_ARTISTS,
    {query, page, pageSize});
}

module.exports.topTracks = ({page, pageSize}) => {
  return genericQuery(
    LAST_FM_QUERY_TYPES.TOP_TRACKS,
    {page, pageSize});
}

module.exports.topArtists = ({page, pageSize}) => {
  return genericQuery(
    LAST_FM_QUERY_TYPES.TOP_ARTISTS,
    {page, pageSize});
}

module.exports.getImageUrl = (image, preferredIdx) => {
  if (preferredIdx >= image.length) {
    preferredIdx = image.length - 1;
  }
  for (let i = preferredIdx; i >= 0; i--) {
    const url = image[i]['#text'];
    if (isNotEmpty(url)) { return url; }
  }
  return '';
}

//
// Private:
//
// ------------------------------------

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const BASE_URL_PARAMS = {
  api_key: LAST_FM_API_KEY,
  format: 'json',
};

const genericQuery = (queryType, apiParams) => {
  return getQueryParams(queryType, apiParams)
    .then((queryParams) => {
      return makeQuery(queryParams);
    }).then((response) => {
      return formatResponse(queryType, response);
    });
}

const getQueryParams = (queryType, {query, page, pageSize}) => {
  return new Promise((resolve, reject) => {

    page = isNotEmpty(page) ? page : 1;
    pageSize = isNotEmpty(pageSize) ? pageSize : DEFAULT_PAGE_SIZE;

    let queryParams = Object.assign({}, BASE_URL_PARAMS);
    switch (queryType) {
      case LAST_FM_QUERY_TYPES.SEARCH_TRACKS:
        queryParams = Object.assign(queryParams, {
          track: query,
          method: 'track.search',
          page,
          limit: pageSize,
        });
        break;
      case LAST_FM_QUERY_TYPES.SEARCH_ARTISTS:
        queryParams = Object.assign(queryParams, {
          artist: query,
          method: 'artist.search',
          page,
          limit: pageSize,
        });
        break;
      case LAST_FM_QUERY_TYPES.TOP_TRACKS:
        queryParams = Object.assign(queryParams, {
          method: 'chart.gettoptracks',
          page,
          limit: pageSize,
        });
        break;
      case LAST_FM_QUERY_TYPES.TOP_ARTISTS:
        queryParams = Object.assign(queryParams, {
          method: 'chart.gettopartists',
          page,
          limit: pageSize,
        });
        break;
    }
    resolve(queryParams);
  });
}

const makeQuery = (queryParams) => {
  return new Promise((resolve, reject) => {
    const url = getUrlWithUpdatedParams(BASE_URL, queryParams);
    $.get(url, resolve).fail(reject);
  });
}

const formatResponse = (queryType, response) => {
  switch (queryType) {
    case LAST_FM_QUERY_TYPES.SEARCH_TRACKS:
      return {
        tracks: formatEntitiesFromApi(response.results.trackmatches.track),
        total: parseInt(response.results['opensearch:totalResults']),
        page: response.results['opensearch:startIndex'] /
            response.results['opensearch:itemsPerPage']
      };
    case LAST_FM_QUERY_TYPES.SEARCH_ARTISTS:
      return {
        artists: formatEntitiesFromApi(response.results.artistmatches.artist),
        total: parseInt(response.results['opensearch:totalResults']),
        page: response.results['opensearch:startIndex'] /
            response.results['opensearch:itemsPerPage']
      };
    case LAST_FM_QUERY_TYPES.TOP_TRACKS:
      return {
        tracks: formatEntitiesFromApi(response.tracks.track),
        total: parseInt(response.tracks['@attr'].total),
        page: parseInt(response.tracks['@attr'].page)
      };
    case LAST_FM_QUERY_TYPES.TOP_ARTISTS:
      return {
        artists: formatEntitiesFromApi(response.artists.artist),
        total: parseInt(response.artists['@attr'].total),
        page: parseInt(response.artists['@attr'].page)
      };
  }
}

const formatEntitiesFromApi = (entities) => {
  const takenIds = {};
  const formattedEntities = [];
  entities.forEach((entity) => {
    // format mbid.
    entity.mbid = entity.mbid || makeFakeId();
    if (takenIds[entity.mbid]) { return; }
    takenIds[entity.mbid] = true;

    // format artist (for tracks only).
    if (typeof entity.artist === 'string') {
      entity.artist = {name: entity.artist};
    }

    formattedEntities.push(entity);
  });
  return formattedEntities;
}
