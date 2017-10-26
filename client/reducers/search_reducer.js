import { RECEIVE_TRACK_RESULTS, RECEIVE_ARTIST_RESULTS, BEGIN_FETCHING_TRACKS,
  BEGIN_FETCHING_ARTISTS, CLEAR_TRACKS, CLEAR_ARTISTS } from '../actions/search_actions';
import { reduce, concatEntities } from './shared';

const DEFAULT_STATE = {
  trackResults: {
    tracks: [],
    isFetching: false,
  },
  artistResults: {
    artists: [],
    isFetching: false,
  },
};

const searchReducer = (prevState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case BEGIN_FETCHING_TRACKS:
      return reduce(prevState, {
        '#recurse': true,
        trackResults: {
          isFetching: true,
        },
      });
    case RECEIVE_TRACK_RESULTS:
      const tracks = concatEntities(prevState.trackResults.tracks, action.tracks);
      return reduce(prevState, {
        '#recurse': true,
        trackResults: {
          tracks,
          isFetching: false,
        },
      });
    case CLEAR_TRACKS:
      return reduce(prevState, {
        '#recurse': true,
        trackResults: {
          tracks: [],
        },
      });
    case BEGIN_FETCHING_ARTISTS:
      return reduce(prevState, {
        '#recurse': true,
        artistResults: {
          isFetching: true,
        },
      });
    case RECEIVE_ARTIST_RESULTS:
      const artists = concatEntities(prevState.artistResults.artists, action.artists);
      return reduce(prevState, {
        '#recurse': true,
        artistResults: {
          artists,
          isFetching: false,
        },
      });
    case CLEAR_ARTISTS:
      return reduce(prevState, {
        '#recurse': true,
        artistResults: {
          artists: [],
        },
      });
    default:
      return prevState;
  }
};

export default searchReducer
