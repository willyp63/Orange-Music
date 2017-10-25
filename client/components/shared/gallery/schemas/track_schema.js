import TRACK_ACTIONS from '../../table_actions/track_actions';

const TRACK_GALLERY_SCHEMA = {
  titlePath: 'name',
  subtitlePath: 'artist.name',
  imagePath: 'image',
  actions: TRACK_ACTIONS,
};

export default TRACK_GALLERY_SCHEMA;
