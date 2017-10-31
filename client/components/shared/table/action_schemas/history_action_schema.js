import TRACK_ACTION_SCHEMA from './track_action_schema';

const ACTION_TYPES = {
  REMOVE_TRACK_FROM_HISTORY: 3, // 3 prior actions
};

const HISTORY_ACTIONS = Object.assign({}, TRACK_ACTION_SCHEMA);
HISTORY_ACTIONS[ACTION_TYPES.REMOVE_TRACK_FROM_HISTORY] = {
  buttonClassName: 'remove-from-history-btn',
  icon: 'remove',
  tooltipText: 'Remove from history',
  actionName: 'removeTrackFromHistory',
};

export default HISTORY_ACTIONS;
