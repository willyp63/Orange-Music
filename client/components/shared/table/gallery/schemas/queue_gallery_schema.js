import QUEUE_ACTIONS from '../../action_schemas/queue_action_schema';

const QUEUE_GALLERY_SCHEMA = {
  titlePath: 'name',
  subtitlePath: 'artist.name',
  imagePath: 'image',
  actions: QUEUE_ACTIONS,
};

export default QUEUE_GALLERY_SCHEMA;
