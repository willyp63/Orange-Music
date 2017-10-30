import QUEUE_LIST_SCHEMA from '../shared/table/list/schemas/queue_list_schema';
import HISTORY_LIST_SCHEMA from '../shared/table/list/schemas/history_list_schema';
import QUEUE_GALLERY_SCHEMA from '../shared/table/gallery/schemas/queue_gallery_schema';
import HISTORY_GALLERY_SCHEMA from '../shared/table/gallery/schemas/history_gallery_schema';

export const QUEUE_TABLE_TYPES = {
  QUEUE: 0,
  HISTORY: 1,
};

let QUEUE_TABLE_SCHEMAS = {};
QUEUE_TABLE_SCHEMAS[QUEUE_TABLE_TYPES.QUEUE] = {
  label: 'Up Next',
  pathname: '/queue/up_next',
  listSchema: QUEUE_LIST_SCHEMA,
  gallerySchema: QUEUE_GALLERY_SCHEMA,
};
QUEUE_TABLE_SCHEMAS[QUEUE_TABLE_TYPES.HISTORY] = {
  label: 'History',
  pathname: '/queue/history',
  listSchema: HISTORY_LIST_SCHEMA,
  gallerySchema: HISTORY_GALLERY_SCHEMA,
};

export default QUEUE_TABLE_SCHEMAS;
