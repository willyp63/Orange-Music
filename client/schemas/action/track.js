export const TRACK_ACTION_TYPES = {
  PLAY_TRACK: '0',
  ADD_TRACK_TO_QUEUE: '1',
  ADD_TRACK_TO_PLAYLIST: '2',
};

const ACTIONS = {};
ACTIONS[TRACK_ACTION_TYPES.PLAY_TRACK] = {
  buttonClassName: 'play-btn',
  icon: 'play_arrow',
  tooltipText: 'Play',
  actionName: 'play',
};
ACTIONS[TRACK_ACTION_TYPES.ADD_TRACK_TO_QUEUE] = {
  buttonClassName: 'add-to-queue-btn',
  icon: 'add',
  tooltipText: 'Add to queue',
  actionName: 'addToQueue',
};
ACTIONS[TRACK_ACTION_TYPES.ADD_TRACK_TO_PLAYLIST] = {
  buttonClassName: 'add-to-playlist-btn',
  icon: 'playlist_add',
  tooltipText: 'Add to playlist',
  actionName: 'addToPlaylist',
};

export default ACTIONS;
