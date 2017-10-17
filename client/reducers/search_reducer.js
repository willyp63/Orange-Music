import { RECEIVE_TRACK_RESULTS } from '../actions/search_actions';

const DEFAULT_STATE = Object.freeze({
  tracks: [],
  page: 1,
  total: 0
})

const searchReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_TRACK_RESULTS:
      return {
        tracks: action.tracks,
        page: action.page,
        total: action.total
      };
    default:
      return state
  }
}

export default searchReducer
