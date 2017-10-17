import lastFmApi from '../api/last_fm/last_fm_api';

export const searchTracks = ({query, page, pageSize}) => {
  return (dispatch) => {
    return lastFmApi.search({query, page, pageSize}).then((results) => {
      dispatch(receiveTrackResults(results));
    }, (err) => {
      console.log(`Error searching tracks: ${err}`);
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
}
export const RECEIVE_TRACK_RESULTS = 'RECEIVE_TRACK_RESULTS'
