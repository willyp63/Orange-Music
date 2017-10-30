import { RECEIVE_TRACK_RESULTS, RECEIVE_ARTIST_RESULTS, BEGIN_FETCHING_TRACKS,
  BEGIN_FETCHING_ARTISTS, CLEAR_TRACKS, CLEAR_ARTISTS } from '../actions/search_actions';
import { reduce, concatEntities } from './shared';

const DEFAULT_STATE = {
  trackResults: {
    tracks: [],
    isFetching: false,
    endOfTable: false,
  },
  artistResults: {
    artists: [],
    isFetching: false,
    endOfTable: false,
  },
};

const searchReducer = (prevState = DEFAULT_STATE, action) => {
  let endOfTable;
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
      endOfTable = action.tracks.length === 0;
      return reduce(prevState, {
        '#recurse': true,
        trackResults: {
          tracks,
          query: action.query,
          isFetching: false,
          endOfTable,
        },
      });
    case CLEAR_TRACKS:
      return reduce(prevState, {
        '#recurse': true,
        trackResults: {
          tracks: [],
          endOfTable: false,
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
      endOfTable = action.artists.length === 0;
      return reduce(prevState, {
        '#recurse': true,
        artistResults: {
          artists,
          query: action.query,
          isFetching: false,
          endOfTable,
        },
      });
    case CLEAR_ARTISTS:
      return reduce(prevState, {
        '#recurse': true,
        artistResults: {
          artists: [],
          endOfTable: false,
        },
      });
    default:
      return prevState;
  }
};

export default searchReducer
