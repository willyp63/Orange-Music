import TRACK_ACTIONS from './track';

export const PLAYLIST_DETAIL_ACTION_TYPES = {
  REMOVE_FROM_PLAYLIST: '3', // 3 prior actions
};

const ACTIONS = {...TRACK_ACTIONS};
ACTIONS[PLAYLIST_DETAIL_ACTION_TYPES.REMOVE_FROM_PLAYLIST] = {
  buttonClassName: 'remove-from-playlist-btn',
  icon: 'remove',
  tooltipText: 'Remove from playlist',
  actionName: 'removeTrackFromPlaylist',
};

export default ACTIONS;
