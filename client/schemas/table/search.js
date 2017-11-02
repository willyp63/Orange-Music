import TRACK_LIST_SCHEMA from '../list/track';
import ARTIST_LIST_SCHEMA from '../list/artist';
import TRACK_GALLERY_SCHEMA from '../gallery/track';
import ARTIST_GALLERY_SCHEMA from '../gallery/artist';

export const SEARCH_TABLE_TYPES = {
  TRACKS: '0',
  ARTISTS: '1',
};

let SCHEMA = {};
SCHEMA[SEARCH_TABLE_TYPES.TRACKS] = {
  label: 'Tracks',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
};
SCHEMA[SEARCH_TABLE_TYPES.ARTISTS] = {
  label: 'Artists',
  listSchema: ARTIST_LIST_SCHEMA,
  gallerySchema: ARTIST_GALLERY_SCHEMA,
};

export default SCHEMA;
