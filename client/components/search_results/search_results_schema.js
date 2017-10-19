import TextCellComponent from './cells/text_cell';
import ImageCellComponent from './cells/image_cell';
import ActionsCellComponent from './cells/actions_cell';

const SCHEMA = {
  image: {
    order: 0,
    label: null,
    width: 8,
    component: ImageCellComponent
  },
  name: {
    order: 1,
    label: 'Track',
    width: 42,
    component: TextCellComponent
  },
  artist: {
    order: 2,
    label: 'Artist',
    width: 42,
    component: TextCellComponent
  },
  '@actions': {
    order: 3,
    label: null,
    width: 8,
    component: ActionsCellComponent
  }
};

export default SCHEMA;
