import { RECEIVE_TRACK_RESULTS, RECEIVE_ARTIST_RESULTS } from '../actions/search_actions';

const DEFAULT_STATE = Object.freeze({
  tracks: [],
  artists: [],
})

const searchReducer = (prevState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_TRACK_RESULTS:
      return Object.assign({}, prevState, {
        tracks: action.tracks,
      });
    case RECEIVE_ARTIST_RESULTS:
      return Object.assign({}, prevState, {
        artists: action.artists,
      });
    default:
      return prevState
  }
}

export default searchReducer
