const ACTION_TYPES = {
  REMOVE_TRACK_FROM_QUEUE: 0,
};

const NOW_PLAYING_ACTION_SCHEMA = {};
NOW_PLAYING_ACTION_SCHEMA[ACTION_TYPES.REMOVE_TRACK_FROM_QUEUE] = {
  buttonClassName: 'remove-from-history-btn',
  icon: 'remove',
  actionName: 'removeTrackFromQueue',
};

export default NOW_PLAYING_ACTION_SCHEMA;
