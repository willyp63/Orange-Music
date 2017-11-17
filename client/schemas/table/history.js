import TRACK_SCHEMA from './track';
import ACTIONS from '../action/history';

const SCHEMA = Object.assign({}, TRACK_SCHEMA, {
  actions: ACTIONS,
});

export default SCHEMA;
