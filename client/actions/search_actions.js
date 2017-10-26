import lastFmApi from '../api/last_fm/last_fm_api';

export const searchTracks = (query) => {
  return (dispatch) => {
    return lastFmApi.searchTracks({query}).then((results) => {
      dispatch(receiveTrackResults(results));
    });
  }
}

const receiveTrackResults = ({tracks, page, total}) => {
  return {
    type: RECEIVE_TRACK_RESULTS,
    tracks,
    page,
    total
  };
};
export const RECEIVE_TRACK_RESULTS = 'RECEIVE_TRACK_RESULTS';


export const searchArtists = (query) => {
  return (dispatch) => {
    return lastFmApi.searchArtists({query}).then((results) => {
      dispatch(receiveArtistResults(results));
    });
  }
}

const receiveArtistResults = ({artists, page, total}) => {
  return {
    type: RECEIVE_ARTIST_RESULTS,
    artists,
    page,
    total
  };
};
export const RECEIVE_ARTIST_RESULTS = 'RECEIVE_ARTIST_RESULTS';
