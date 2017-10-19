import { RECEIVE_TRACK_TO_PLAY } from '../actions/player_actions';

const DEFAULT_STATE = Object.freeze({
  track: null,
  video: null
});

const playerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case RECEIVE_TRACK_TO_PLAY:
      return {
        track: action.track,
        video: action.video
      };
    default:
      return state
  }
}

export default playerReducer
