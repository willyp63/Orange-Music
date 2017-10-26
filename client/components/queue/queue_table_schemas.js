import QUEUE_LIST_SCHEMA from '../shared/table/list/schemas/queue_list_schema';
import QUEUE_GALLERY_SCHEMA from '../shared/table/gallery/schemas/queue_gallery_schema';

export const QUEUE_TABLE_TYPES = {
  QUEUE: 0,
  HISTORY: 1,
};

let QUEUE_TABLE_SCHEMAS = {};
QUEUE_TABLE_SCHEMAS[QUEUE_TABLE_TYPES.QUEUE] = {
  label: 'Queue',
  listSchema: QUEUE_LIST_SCHEMA,
  gallerySchema: QUEUE_GALLERY_SCHEMA,
};
QUEUE_TABLE_SCHEMAS[QUEUE_TABLE_TYPES.HISTORY] = {
  label: 'History',
  listSchema: QUEUE_LIST_SCHEMA,
  gallerySchema: QUEUE_GALLERY_SCHEMA,
};

export default QUEUE_TABLE_SCHEMAS;
