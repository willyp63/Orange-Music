import TRACK_SCHEMA from './track';
import ACTIONS from '../action/playlist_detail';

// Track list schema w/ Playlist Detail actions
const SCHEMA = Object.assign({}, TRACK_SCHEMA, {
  '@actions': Object.assign({}, TRACK_SCHEMA['@actions'], {
    actions: ACTIONS,
  }),
});

export default SCHEMA;
