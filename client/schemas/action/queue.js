import TRACK_ACTIONS from './track';

export const QUEUE_ACTION_TYPES = {
  REMOVE_FROM_QUEUE: '3', // 3 prior actions
};

const ACTIONS = {...TRACK_ACTIONS};
ACTIONS[QUEUE_ACTION_TYPES.REMOVE_FROM_QUEUE] = {
  buttonClassName: 'remove-from-queue-btn',
  icon: 'remove',
  tooltipText: 'Remove from queue',
  actionName: 'removeFromQueue',
};

export default ACTIONS;
