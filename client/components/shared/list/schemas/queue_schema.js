import TRACK_LIST_SCHEMA from './track_schema';
import QUEUE_ACTIONS from '../../table_actions/queue_actions';

const QUEUE_LIST_SCHEMA = Object.assign({}, TRACK_LIST_SCHEMA, {
  '@actions': Object.assign({}, TRACK_LIST_SCHEMA['@actions'], {
    actions: QUEUE_ACTIONS,
  }),
});

export default QUEUE_LIST_SCHEMA;
