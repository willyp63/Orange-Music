import lastFmApi from '../api/last_fm/last_fm_api';

export const searchTracks = (query, queryParams) => {
  return (dispatch) => {
    dispatch(beginFetchingTracksMsg());
    queryParams = queryParams || {};
    queryParams.query = query;
    return lastFmApi.searchTracks(queryParams).then(({tracks}) => {
      dispatch(receiveTrackResultsMsg(tracks));
    });
  };
};

const beginFetchingTracksMsg = () => {
  return {type: BEGIN_FETCHING_TRACKS};
};
export const BEGIN_FETCHING_TRACKS = 'BEGIN_FETCHING_TRACKS';

const receiveTrackResultsMsg = (tracks) => {
  return {
    type: RECEIVE_TRACK_RESULTS,
    tracks,
  };
};
export const RECEIVE_TRACK_RESULTS = 'RECEIVE_TRACK_RESULTS';


export const searchArtists = (query, queryParams) => {
  return (dispatch) => {
    dispatch(beginFetchingArtistsMsg());
    queryParams = queryParams || {};
    queryParams.query = query;
    return lastFmApi.searchArtists(queryParams).then(({artists}) => {
      dispatch(receiveArtistResultsMsg(artists));
    });
  };
};

const beginFetchingArtistsMsg = () => {
  return {type: BEGIN_FETCHING_ARTISTS};
};
export const BEGIN_FETCHING_ARTISTS = 'BEGIN_FETCHING_ARTISTS';

const receiveArtistResultsMsg = (artists) => {
  return {
    type: RECEIVE_ARTIST_RESULTS,
    artists,
  };
};
export const RECEIVE_ARTIST_RESULTS = 'RECEIVE_ARTIST_RESULTS';


export const clearTracks = () => {
  return (dispatch) => { dispatch(clearTracksMsg()); };
};

const clearTracksMsg = () => {
  return {type: CLEAR_TRACKS};
};
export const CLEAR_TRACKS = 'CLEAR_TRACKS';


export const clearArtists = () => {
  return (dispatch) => { dispatch(clearArtistsMsg()); };
};

const clearArtistsMsg = () => {
  return {type: CLEAR_ARTISTS};
};
export const CLEAR_ARTISTS = 'CLEAR_ARTISTS';
