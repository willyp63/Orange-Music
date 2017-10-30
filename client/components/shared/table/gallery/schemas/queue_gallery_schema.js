import TRACK_GALLERY_SCHEMA from './track_gallery_schema';
import QUEUE_ACTIONS from '../../action_schemas/queue_action_schema';

const QUEUE_GALLERY_SCHEMA = Object.assign(TRACK_GALLERY_SCHEMA, {
  actions: QUEUE_ACTIONS,
});

export default QUEUE_GALLERY_SCHEMA;
