import TRACK_ACTIONS from './track';

export const QUEUE_ACTION_TYPES = {
  REMOVE_FROM_QUEUE: 'REMOVE_FROM_QUEUE',
};

const ACTIONS = {...TRACK_ACTIONS};
ACTIONS[QUEUE_ACTION_TYPES.REMOVE_FROM_QUEUE] = {
  label: 'Remove from queue',
  actionName: 'removeFromQueue',
};

export default ACTIONS;
