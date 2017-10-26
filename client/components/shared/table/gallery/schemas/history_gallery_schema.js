import HISTORY_ACTIONS from '../../action_schemas/history_action_schema';

const HISTORY_GALLERY_SCHEMA = {
  titlePath: 'name',
  subtitlePath: 'artist.name',
  imagePath: 'image',
  actions: HISTORY_ACTIONS,
};

export default HISTORY_GALLERY_SCHEMA;
