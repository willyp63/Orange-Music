import { RECEIVE_TRACK_TO_PLAY, PREPARE_TO_PLAY_TRACK } from '../actions/player_actions';

const DEFAULT_STATE = Object.freeze({
  track: null,
  video: null
});

const playerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_TRACK_TO_PLAY:
      return Object.assign({}, state, {
        track: action.track,
        video: action.video
      });
    case PREPARE_TO_PLAY_TRACK:
      return Object.assign({}, state, {
        track: action.track,
        video: null
      });
    default:
      return state
  }
}

export default playerReducer
