import TRACK_TABLE_SCHEMA from '../table/track';
import ARTIST_TABLE_SCHEMA from '../table/artist';
import PLAYLISTS_TABLE_SCHEMA from '../table/playlists';

export const HOME_TABLE_TYPES = {
  TOP_TRACKS: '0',
  TOP_ARTISTS: '1',
  TOP_PLAYLISTS: '2',
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
SCHEMA[HOME_TABLE_TYPES.TOP_PLAYLISTS] = {
  label: 'Top Playlists',
  tableSchema: PLAYLISTS_TABLE_SCHEMA,
};

export default SCHEMA;
