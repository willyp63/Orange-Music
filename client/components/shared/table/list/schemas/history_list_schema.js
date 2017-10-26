import TRACK_LIST_SCHEMA from './track_list_schema';
import HISTORY_ACTIONS from '../../action_schemas/history_action_schema';

// Track list schema w/ Queue actions
const HISTORY_LIST_SCHEMA = Object.assign({}, TRACK_LIST_SCHEMA, {
  '@actions': Object.assign({}, TRACK_LIST_SCHEMA['@actions'], {
    actions: HISTORY_ACTIONS,
  }),
});

export default HISTORY_LIST_SCHEMA;
