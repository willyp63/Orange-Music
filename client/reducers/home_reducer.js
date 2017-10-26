import { RECEIVE_TOP_TRACKS, RECEIVE_TOP_ARTISTS, BEGIN_FETCHING_TOP_TRACKS,
  BEGIN_FETCHING_TOP_ARTISTS } from '../actions/home_actions';
import { reduce, concatEntities } from './shared';

const DEFAULT_STATE = {
  topTracks: {
    tracks: [],
    isFetching: false,
  },
  topArtists: {
    artists: [],
    isFetching: false,
  },
};

const homeReducer = (prevState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case BEGIN_FETCHING_TOP_TRACKS:
      return reduce(prevState, {
        '#recurse': true,
        topTracks: {
          isFetching: true,
        },
      });
    case RECEIVE_TOP_TRACKS:
      const tracks = concatEntities(prevState.topTracks.tracks, action.tracks);
      return reduce(prevState, {
        '#recurse': true,
        topTracks: {
          tracks,
          isFetching: false,
        },
      });
    case BEGIN_FETCHING_TOP_ARTISTS:
      return reduce(prevState, {
        '#recurse': true,
        topArtists: {
          isFetching: true,
        },
      });
    case RECEIVE_TOP_ARTISTS:
      const artists = concatEntities(prevState.topArtists.artists, action.artists);
      return reduce(prevState, {
        '#recurse': true,
        topArtists: {
          artists,
          isFetching: false,
        },
      });
    default:
      return prevState;
  }
};

export default homeReducer;
