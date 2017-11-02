import TRACK_ACTION_SCHEMA from './track';

export const HISTORY_ACTION_TYPES = {
  REMOVE_TRACK_FROM_HISTORY: '3', // 3 prior actions
};

const ACTIONS = Object.assign({}, TRACK_ACTION_SCHEMA);
ACTIONS[HISTORY_ACTION_TYPES.REMOVE_TRACK_FROM_HISTORY] = {
  buttonClassName: 'remove-from-history-btn',
  icon: 'remove',
  tooltipText: 'Remove from history',
  actionName: 'removeFromHistory',
};

export default ACTIONS;
