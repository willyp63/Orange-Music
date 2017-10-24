import TRACKS_LIST_SCHEMA from '../shared/list/schemas/tracks_schema';

const ACTION_TYPES = {
  REMOVE_TRACK_FROM_QUEUE: 0,
};

const ACTIONS = {};
ACTIONS[ACTION_TYPES.REMOVE_TRACK_FROM_QUEUE] = {
  buttonClassName: 'remove-from-queue-btn',
  icon: 'remove',
  actionName: 'removeTrackFromQueue',
};

const QUEUE_LIST_SCHEMA = Object.assign({}, TRACKS_LIST_SCHEMA, {
  '@actions': Object.assign({}, TRACKS_LIST_SCHEMA['@actions'], {
    actions: ACTIONS,
  }),
});

export default QUEUE_LIST_SCHEMA;
