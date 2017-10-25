import TRACK_LIST_SCHEMA from '../shared/table/list/schemas/track_list_schema';
import TRACK_GALLERY_SCHEMA from '../shared/table/gallery/schemas/track_gallery_schema';

export const QUEUE_TABLE_TYPES = {
  QUEUE: 0,
  HISTORY: 1,
};

let QUEUE_TABLE_SCHEMA = {};
QUEUE_TABLE_SCHEMA[QUEUE_TABLE_TYPES.QUEUE] = {
  label: 'Queue',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
};
QUEUE_TABLE_SCHEMA[QUEUE_TABLE_TYPES.HISTORY] = {
  label: 'History',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
};

export default QUEUE_TABLE_SCHEMA;
