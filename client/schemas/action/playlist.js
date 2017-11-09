export const PLAYLIST_ACTION_TYPES = {
  DELETE_PLAYLIST: '0',
};

const ACTIONS = {};
ACTIONS[PLAYLIST_ACTION_TYPES.DELETE_PLAYLIST] = {
  buttonClassName: 'delete-playlist-btn',
  icon: 'remove',
  tooltipText: 'Delete playlist',
  actionName: 'deletePlaylist',
};

export default ACTIONS;
