import { UNIVERSAL_ACTION_TYPES } from './universal';

export const TRACK_ACTION_TYPES = {
  PLAY_TRACK: UNIVERSAL_ACTION_TYPES.PLAY,
  ADD_TRACK_TO_PLAYLIST: 'ADD_TRACK_TO_PLAYLIST',
  ADD_TRACK_TO_QUEUE: 'ADD_TRACK_TO_QUEUE',
};

const ACTIONS = {};
ACTIONS[TRACK_ACTION_TYPES.PLAY_TRACK] = {
  label: 'Play',
  actionName: 'play',
};
ACTIONS[TRACK_ACTION_TYPES.ADD_TRACK_TO_PLAYLIST] = {
  label: 'Add to playlist',
  actionName: 'addToPlaylist',
};
ACTIONS[TRACK_ACTION_TYPES.ADD_TRACK_TO_QUEUE] = {
  label: 'Add to queue',
  actionName: 'addToQueue',
};

export default ACTIONS;
