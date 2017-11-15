import TRACK_ACTIONS from './track';

export const PLAYLIST_DETAIL_ACTION_TYPES = {
  REMOVE_FROM_PLAYLIST: 'REMOVE_FROM_PLAYLIST',
};

const ACTIONS = {...TRACK_ACTIONS};
ACTIONS[PLAYLIST_DETAIL_ACTION_TYPES.REMOVE_FROM_PLAYLIST] = {
  label: 'Remove from playlist',
  actionName: 'removeTrackFromPlaylist',
};

export default ACTIONS;
