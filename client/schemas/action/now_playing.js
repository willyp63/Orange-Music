import { QUEUE_ACTION_TYPES } from './queue';

const ACTIONS = {};
ACTIONS[QUEUE_ACTION_TYPES.REMOVE_TRACK_FROM_QUEUE] = {
  buttonClassName: 'remove-from-history-btn',
  icon: 'remove',
  tooltipText: 'Remove from queue',
  actionName: 'removeFromQueue',
};

export default ACTIONS;
