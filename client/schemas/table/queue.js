import QUEUE_LIST_SCHEMA from '../list/queue';
import HISTORY_LIST_SCHEMA from '../list/history';
import QUEUE_GALLERY_SCHEMA from '../gallery/queue';
import HISTORY_GALLERY_SCHEMA from '../gallery/history';

export const QUEUE_TABLE_TYPES = {
  QUEUE: '0',
  HISTORY: '1',
};

let SCHEMA = {};
SCHEMA[QUEUE_TABLE_TYPES.QUEUE] = {
  label: 'Up Next',
  listSchema: QUEUE_LIST_SCHEMA,
  gallerySchema: QUEUE_GALLERY_SCHEMA,
  endOfTable: true, /* Entire queue is always loaded on component load */
};
SCHEMA[QUEUE_TABLE_TYPES.HISTORY] = {
  label: 'History',
  listSchema: HISTORY_LIST_SCHEMA,
  gallerySchema: HISTORY_GALLERY_SCHEMA,
  endOfTable: true, /* Entire history is always loaded on component load */
};

export default SCHEMA;
