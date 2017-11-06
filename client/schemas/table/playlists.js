import PLAYLISTS_LIST_SCHEMA from '../list/playlists';
import PLAYLISTS_GALLERY_SCHEMA from '../gallery/playlists';

export const PLAYLISTS_TABLE_TYPES = {
  PLAYLISTS: '0',
};

let SCHEMA = {};
SCHEMA[PLAYLISTS_TABLE_TYPES.PLAYLISTS] = {
  label: '@NA',
  listSchema: PLAYLISTS_LIST_SCHEMA,
  gallerySchema: PLAYLISTS_GALLERY_SCHEMA,
  endOfTable: true, /* All playlists are always loaded on component load */
};

export default SCHEMA;
