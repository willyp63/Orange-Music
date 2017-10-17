import { PLAY_TRACK } from '../actions/player_actions';

const DEFAULT_STATE = Object.freeze({
  track: null
});

const playerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PLAY_TRACK:
      return {
        track: action.track
      };
    default:
      return state
  }
}

export default playerReducer
