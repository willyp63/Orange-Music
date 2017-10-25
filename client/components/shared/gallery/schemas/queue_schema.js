import QUEUE_ACTIONS from '../../table_actions/queue_actions';

const QUEUE_GALLERY_SCHEMA = {
  titlePath: 'name',
  subtitlePath: 'artist.name',
  imagePath: 'image',
  actions: QUEUE_ACTIONS,
};

export default QUEUE_GALLERY_SCHEMA;
