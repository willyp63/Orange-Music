import TRACK_TABLE_SCHEMA from '../table/track';
import ARTIST_TABLE_SCHEMA from '../table/artist';

export const HOME_TABLE_TYPES = {
  TOP_TRACKS: '0',
  TOP_ARTISTS: '1',
};

let SCHEMA = {};
SCHEMA[HOME_TABLE_TYPES.TOP_TRACKS] = {
  label: 'Top Tracks',
  tableSchema: TRACK_TABLE_SCHEMA,
};
SCHEMA[HOME_TABLE_TYPES.TOP_ARTISTS] = {
  label: 'Top Artists',
  tableSchema: ARTIST_TABLE_SCHEMA,
};

export default SCHEMA;
