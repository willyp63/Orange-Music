import TRACK_TABLE_SCHEMA from '../table/track';
import ARTIST_TABLE_SCHEMA from '../table/artist';

export const SEARCH_TABLE_TYPES = {
  TRACKS: '0',
  ARTISTS: '1',
};

let SCHEMA = {};
SCHEMA[SEARCH_TABLE_TYPES.TRACKS] = {
  label: 'Tracks',
  tableSchema: TRACK_TABLE_SCHEMA,
};
SCHEMA[SEARCH_TABLE_TYPES.ARTISTS] = {
  label: 'Artists',
  tableSchema: ARTIST_TABLE_SCHEMA,
};

export default SCHEMA;
