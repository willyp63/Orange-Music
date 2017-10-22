import lastFmApi from '../api/last_fm/last_fm_api';

export const fetchTracks = () => {
  return (dispatch) => {
    return lastFmApi.topTracks({}).then(({tracks, page, total}) => {
      dispatch(receiveTopTracks({tracks, page, total}));
    }, (err) => {
      console.log(`Error fetching top tracks: ${err}`);
    });
  }
}

const receiveTopTracks = ({tracks, page, total}) => {
  return {
    type: RECEIVE_TOP_TRACKS,
    tracks,
    page,
    total
  };
};
export const RECEIVE_TOP_TRACKS = 'RECEIVE_TOP_TRACKS';
