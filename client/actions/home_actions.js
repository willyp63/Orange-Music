import lastFmApi from '../api/last_fm/last_fm_api';

export const fetchTopTracks = () => {
  return (dispatch) => {
    return lastFmApi.topTracks({}).then(({tracks, page, total}) => {
      dispatch(receiveTopTracksMsg({tracks, page, total}));
    }, (err) => {
      console.log(`Error fetching top tracks: ${err}`);
    });
  }
}

const receiveTopTracksMsg = ({tracks, page, total}) => {
  return {
    type: RECEIVE_TOP_TRACKS,
    tracks,
    page,
    total
  };
};
export const RECEIVE_TOP_TRACKS = 'RECEIVE_TOP_TRACKS';

export const fetchTopArtists = () => {
  return (dispatch) => {
    return lastFmApi.topArtists({}).then(({artists, page, total}) => {
      dispatch(receiveTopArtistsMsg({artists, page, total}));
    }, (err) => {
      console.log(`Error fetching top artists: ${err}`);
    });
  }
}

const receiveTopArtistsMsg = ({artists, page, total}) => {
  return {
    type: RECEIVE_TOP_ARTISTS,
    artists,
    page,
    total
  };
};
export const RECEIVE_TOP_ARTISTS = 'RECEIVE_TOP_ARTISTS';
