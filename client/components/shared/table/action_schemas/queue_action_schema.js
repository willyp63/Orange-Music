//
// Schema of actions applicable to Tracks in the queue.
//

const ACTION_TYPES = {
  REMOVE_TRACK_FROM_QUEUE: 0,
};

const QUEUE_ACTIONS = {};
QUEUE_ACTIONS[ACTION_TYPES.REMOVE_TRACK_FROM_QUEUE] = {
  buttonClassName: 'remove-from-queue-btn',
  icon: 'remove',
  actionName: 'removeTrackFromQueue',
};

export default QUEUE_ACTIONS;
