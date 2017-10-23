import { RECEIVE_TRACK_RESULTS, BEGIN_FETCHING_TRACKS } from '../actions/search_actions';

const DEFAULT_STATE = Object.freeze({
  tracks: [],
  isFetching: false,
})

const searchReducer = (prevState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_TRACK_RESULTS:
      return Object.assign({}, prevState, {
        tracks: action.tracks,
        isFetching: false,
      });
    case BEGIN_FETCHING_TRACKS:
      return Object.assign({}, prevState, {
        tracks: [],
        isFetching: true,
      });
    default:
      return prevState
  }
}

export default searchReducer
