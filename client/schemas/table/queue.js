import TRACK_SCHEMA from './track';
import ACTIONS from '../action/queue';

const SCHEMA = Object.assign({}, TRACK_SCHEMA, {
  actions: ACTIONS,
});

export default SCHEMA;
