const ACTION_TYPES = {
  PLAY_TRACK: 0,
  ADD_TRACK_TO_QUEUE: 1,
  ADD_TRACK_TO_PLAYLIST: 2,
};

const TRACK_ACTIONS = {};
TRACK_ACTIONS[ACTION_TYPES.PLAY_TRACK] = {
  buttonClassName: 'play-btn',
  icon: 'play_arrow',
  actionName: 'playTrack',
};
TRACK_ACTIONS[ACTION_TYPES.ADD_TRACK_TO_QUEUE] = {
  buttonClassName: 'add-to-queue-btn',
  icon: 'add',
  actionName: 'addTrackToQueue',
};
TRACK_ACTIONS[ACTION_TYPES.ADD_TRACK_TO_PLAYLIST] = {
  buttonClassName: 'add-to-playlist-btn',
  icon: 'playlist_add',
  actionName: 'TODO', // TODO
};

export default TRACK_ACTIONS;
