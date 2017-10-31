import TRACK_ACTION_SCHEMA from './track_action_schema';

const ACTION_TYPES = {
  REMOVE_TRACK_FROM_QUEUE: 3, // 3 prior actions
};

const QUEUE_ACTION_SCHEMA = Object.assign({}, TRACK_ACTION_SCHEMA);
QUEUE_ACTION_SCHEMA[ACTION_TYPES.REMOVE_TRACK_FROM_QUEUE] = {
  buttonClassName: 'remove-from-history-btn',
  icon: 'remove',
  tooltipText: 'remove from queue',
  actionName: 'removeTrackFromQueue',
};

export default QUEUE_ACTION_SCHEMA;
