import TRACK_LIST_SCHEMA from '../list/track';
import TRACK_GALLERY_SCHEMA from '../gallery/track';

export const PLAYLIST_DETAIL_TABLE_TYPES = {
  TRACKS: '0',
};

let SCHEMA = {};
SCHEMA[PLAYLIST_DETAIL_TABLE_TYPES.TRACKS] = {
  label: '@NA',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
  endOfTable: true, /* All tracks are always loaded on component load */
};

export default SCHEMA;
