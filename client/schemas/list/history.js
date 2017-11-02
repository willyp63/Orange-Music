import TRACK_SCHEMA from './track';
import ACTIONS from '../action/history';

// Track list schema w/ History actions
const SCHEMA = Object.assign({}, TRACK_SCHEMA, {
  '@actions': Object.assign({}, TRACK_SCHEMA['@actions'], {
    actions: ACTIONS,
  }),
});

export default SCHEMA;
