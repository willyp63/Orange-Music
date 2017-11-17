import PLAYLISTS_TABLE_SCHEMA from '../table/playlists';

export const PLAYLISTS_TABLE_TYPES = {
  PLAYLISTS: '0',
};

let SCHEMA = {};
SCHEMA[PLAYLISTS_TABLE_TYPES.PLAYLISTS] = {
  tableSchema: PLAYLISTS_TABLE_SCHEMA,
  endOfTable: true, /* All playlists are always loaded on component load */
};

export default SCHEMA;
