import TRACK_ACTIONS from '../../action_schemas/track_action_schema';;

const TRACK_GALLERY_SCHEMA = {
  titlePath: 'name',
  subtitlePath: 'artist.name',
  imagePath: 'image',
  actions: TRACK_ACTIONS,
};

export default TRACK_GALLERY_SCHEMA;
