import TRACK_LIST_SCHEMA from './track_list_schema';
import QUEUE_ACTIONS from '../../action_schemas/queue_action_schema';

// Track list schema w/ Queue actions
const QUEUE_LIST_SCHEMA = Object.assign({}, TRACK_LIST_SCHEMA, {
  '@actions': Object.assign({}, TRACK_LIST_SCHEMA['@actions'], {
    actions: QUEUE_ACTIONS,
  }),
});

export default QUEUE_LIST_SCHEMA;
