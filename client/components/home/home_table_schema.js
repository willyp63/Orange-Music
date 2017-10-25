import TRACK_LIST_SCHEMA from '../shared/table/list/schemas/track_list_schema';
import ARTIST_LIST_SCHEMA from '../shared/table/list/schemas/artist_list_schema';
import TRACK_GALLERY_SCHEMA from '../shared/table/gallery/schemas/track_gallery_schema';
import ARTIST_GALLERY_SCHEMA from '../shared/table/gallery/schemas/artist_gallery_schema';

export const HOME_TABLE_TYPES = {
  TOP_TRACKS: 0,
  TOP_ARTISTS: 1,
};

let HOME_TABLE_SCHEMA = {};
HOME_TABLE_SCHEMA[HOME_TABLE_TYPES.TOP_TRACKS] = {
  label: 'Top Tracks',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
};
HOME_TABLE_SCHEMA[HOME_TABLE_TYPES.TOP_ARTISTS] = {
  label: 'Top Artists',
  listSchema: ARTIST_LIST_SCHEMA,
  gallerySchema: ARTIST_GALLERY_SCHEMA,
};

export default HOME_TABLE_SCHEMA;
