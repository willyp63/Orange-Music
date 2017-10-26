import TRACK_LIST_SCHEMA from '../shared/table/list/schemas/track_list_schema';
import ARTIST_LIST_SCHEMA from '../shared/table/list/schemas/artist_list_schema';
import TRACK_GALLERY_SCHEMA from '../shared/table/gallery/schemas/track_gallery_schema';
import ARTIST_GALLERY_SCHEMA from '../shared/table/gallery/schemas/artist_gallery_schema';

export const SEARCH_TABLE_TYPES = {
  TRACKS: 0,
  ARTISTS: 1,
};

let SEARCH_TABLE_SCHEMAS = {};
SEARCH_TABLE_SCHEMAS[SEARCH_TABLE_TYPES.TRACKS] = {
  label: 'Tracks',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
};
SEARCH_TABLE_SCHEMAS[SEARCH_TABLE_TYPES.ARTISTS] = {
  label: 'Artists',
  listSchema: ARTIST_LIST_SCHEMA,
  gallerySchema: ARTIST_GALLERY_SCHEMA,
};

export default SEARCH_TABLE_SCHEMAS;
