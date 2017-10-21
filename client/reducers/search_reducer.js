import { RECEIVE_TRACK_RESULTS, BEGIN_FETCHING_TRACKS } from '../actions/search_actions';

const DEFAULT_STATE = Object.freeze({
  tracks: [],
  page: 1,
  total: 0,
  isFetching: false
})

const searchReducer = (prevState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_TRACK_RESULTS:
      return Object.assign({}, prevState, {
        tracks: action.tracks,
        page: action.page,
        total: action.total,
        isFetching: false
      });
    case BEGIN_FETCHING_TRACKS:
      return Object.assign({}, prevState, {
        tracks: [],
        page: 1,
        total: 0,
        isFetching: true
      });
    default:
      return prevState
  }
}

export default searchReducer
