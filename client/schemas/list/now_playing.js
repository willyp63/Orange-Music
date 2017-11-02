import TRACK_SCHEMA from './track';
import ACTIONS from '../action/now_playing';

// Track list schema w/ Queue actions
const SCHEMA = Object.assign({}, TRACK_SCHEMA, {
  '@actions': Object.assign({}, TRACK_SCHEMA['@actions'], {
    actions: ACTIONS,
  }),
});

export default SCHEMA;
