import TRACK_SCHEMA from './track';
import ACTIONS from '../action/playlist_detail';

const SCHEMA = Object.assign({}, TRACK_SCHEMA, {
  actions: ACTIONS,
});

export default SCHEMA;
