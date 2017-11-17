import PLAYLIST_DETAIL_TABLE_SCHEMA from '../table/playlist_detail';

export const PLAYLIST_DETAIL_TABLE_TYPES = {
  TRACKS: '0',
};

let SCHEMA = {};
SCHEMA[PLAYLIST_DETAIL_TABLE_TYPES.TRACKS] = {
  tableSchema: PLAYLIST_DETAIL_TABLE_SCHEMA,
  endOfTable: true, /* All tracks are always loaded on component load */
};

export default SCHEMA;
