import PLAYLIST_DETAIL_LIST_SCHEMA from '../list/playlist_detail';
import PLAYLIST_DETAIL_GALLERY_SCHEMA from '../gallery/playlist_detail';

export const PLAYLIST_DETAIL_TABLE_TYPES = {
  TRACKS: '0',
};

let SCHEMA = {};
SCHEMA[PLAYLIST_DETAIL_TABLE_TYPES.TRACKS] = {
  label: '@NA',
  listSchema: PLAYLIST_DETAIL_LIST_SCHEMA,
  gallerySchema: PLAYLIST_DETAIL_GALLERY_SCHEMA,
  endOfTable: true, /* All tracks are always loaded on component load */
};

export default SCHEMA;
