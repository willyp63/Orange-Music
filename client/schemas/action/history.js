import TRACK_ACTION_SCHEMA from './track';

export const HISTORY_ACTION_TYPES = {
  REMOVE_TRACK_FROM_HISTORY: 'REMOVE_TRACK_FROM_HISTORY',
};

const ACTIONS = Object.assign({}, TRACK_ACTION_SCHEMA);
ACTIONS[HISTORY_ACTION_TYPES.REMOVE_TRACK_FROM_HISTORY] = {
  label: 'Remove from history',
  actionName: 'removeFromHistory',
};

export default ACTIONS;
