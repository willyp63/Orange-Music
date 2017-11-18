import { UNIVERSAL_ACTION_TYPES } from './universal';

export const PLAYLIST_ACTION_TYPES = {
	PLAY_PLAYLIST: UNIVERSAL_ACTION_TYPES.PLAY,
  DELETE_PLAYLIST: 'DELETE_PLAYLIST',
};

const ACTIONS = {};
ACTIONS[PLAYLIST_ACTION_TYPES.PLAY_PLAYLIST] = {
  label: 'Play',
  actionName: 'playPlaylist',
};
ACTIONS[PLAYLIST_ACTION_TYPES.DELETE_PLAYLIST] = {
  label: 'Delete playlist',
  actionName: 'deletePlaylist',
  test: (playlist) => !playlist.isStatic,
};

export default ACTIONS;
