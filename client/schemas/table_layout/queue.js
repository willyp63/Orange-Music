import QUEUE_TABLE_SCHEMA from '../table/queue';
import HISTORY_TABLE_SCHEMA from '../table/history';

export const QUEUE_TABLE_TYPES = {
  QUEUE: '0',
  HISTORY: '1',
};

let SCHEMA = {};
SCHEMA[QUEUE_TABLE_TYPES.QUEUE] = {
  label: 'Up Next',
  tableSchema: QUEUE_TABLE_SCHEMA,
  endOfTable: true, /* Entire queue is always loaded on component load */
};
SCHEMA[QUEUE_TABLE_TYPES.HISTORY] = {
  label: 'History',
  tableSchema: HISTORY_TABLE_SCHEMA,
  endOfTable: true, /* Entire history is always loaded on component load */
};

export default SCHEMA;
