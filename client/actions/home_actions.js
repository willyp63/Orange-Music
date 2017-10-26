import lastFmApi from '../api/last_fm/last_fm_api';

export const fetchTopTracks = (queryParams) => {
  return (dispatch) => {
    dispatch(beginFetchingTopTracksMsg());
    return lastFmApi.topTracks(queryParams).then(({tracks}) => {
      dispatch(receiveTopTracksMsg(tracks));
    });
  }
}

const beginFetchingTopTracksMsg = () => {
  return {type: BEGIN_FETCHING_TOP_TRACKS};
};
export const BEGIN_FETCHING_TOP_TRACKS = 'BEGIN_FETCHING_TOP_TRACKS';

const receiveTopTracksMsg = (tracks) => {
  return {
    type: RECEIVE_TOP_TRACKS,
    tracks,
  };
};
export const RECEIVE_TOP_TRACKS = 'RECEIVE_TOP_TRACKS';

export const fetchTopArtists = (queryParams) => {
  return (dispatch) => {
    dispatch(beginFetchingTopArtistsMsg());
    return lastFmApi.topArtists(queryParams).then(({artists}) => {
      dispatch(receiveTopArtistsMsg(artists));
    });
  }
}

const beginFetchingTopArtistsMsg = () => {
  return {type: BEGIN_FETCHING_TOP_ARTISTS};
};
export const BEGIN_FETCHING_TOP_ARTISTS = 'BEGIN_FETCHING_TOP_ARTISTS';

const receiveTopArtistsMsg = (artists) => {
  return {
    type: RECEIVE_TOP_ARTISTS,
    artists,
  };
};
export const RECEIVE_TOP_ARTISTS = 'RECEIVE_TOP_ARTISTS';
