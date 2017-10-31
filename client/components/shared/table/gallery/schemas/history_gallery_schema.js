import TRACK_GALLERY_SCHEMA from './track_gallery_schema';
import HISTORY_ACTIONS from '../../action_schemas/history_action_schema';

const HISTORY_GALLERY_SCHEMA = Object.assign({}, TRACK_GALLERY_SCHEMA, {
  actions: HISTORY_ACTIONS,
});

export default HISTORY_GALLERY_SCHEMA;
