import TRACK_LIST_SCHEMA from '../list/track';
import ARTIST_LIST_SCHEMA from '../list/artist';
import TRACK_GALLERY_SCHEMA from '../gallery/track';
import ARTIST_GALLERY_SCHEMA from '../gallery/artist';

export const HOME_TABLE_TYPES = {
  TOP_TRACKS: '0',
  TOP_ARTISTS: '1',
};

let SCHEMA = {};
SCHEMA[HOME_TABLE_TYPES.TOP_TRACKS] = {
  label: 'Top Tracks',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
};
SCHEMA[HOME_TABLE_TYPES.TOP_ARTISTS] = {
  label: 'Top Artists',
  listSchema: ARTIST_LIST_SCHEMA,
  gallerySchema: ARTIST_GALLERY_SCHEMA,
};

export default SCHEMA;
