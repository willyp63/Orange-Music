import TRACK_LIST_SCHEMA from './track_list_schema';
import NOW_PLAYING_ACTION_SCHEMA from '../../action_schemas/now_playing_action_schema';

// Track list schema w/ Queue actions
const NOW_PLAYING_LIST_SCHEMA = Object.assign({}, TRACK_LIST_SCHEMA, {
  '@actions': Object.assign({}, TRACK_LIST_SCHEMA['@actions'], {
    actions: NOW_PLAYING_ACTION_SCHEMA,
  }),
});

export default NOW_PLAYING_LIST_SCHEMA;
