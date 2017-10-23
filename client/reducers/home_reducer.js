import { RECEIVE_TOP_TRACKS, RECEIVE_TOP_ARTISTS } from '../actions/home_actions';

const DEFAULT_STATE = Object.freeze({
  topTracks: {
    tracks: [],
    page: 1,
    total: 0
  },
  topArtists: {
    artists: [],
    page: 1,
    total: 0
  }
});

const homeReducer = (prevState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_TOP_TRACKS:
      return Object.assign({}, prevState, {
        topTracks: {
          tracks: action.tracks,
          page: action.page,
          total: action.total
        }
      });
    case RECEIVE_TOP_ARTISTS:
    return Object.assign({}, prevState, {
      topArtists: {
        artists: action.artists,
        page: action.page,
        total: action.total
      }
    });
    default:
      return prevState
  }
}

export default homeReducer;
