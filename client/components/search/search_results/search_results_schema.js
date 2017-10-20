import TextCellComponent from '../../shared/flex_table/cells/text_cell';
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
    width: 40,
    component: TextCellComponent
  },
  artist: {
    order: 2,
    label: 'Artist',
    width: 40,
    component: TextCellComponent
  },
  '@actions': {
    order: 3,
    label: null,
    width: 12,
    component: ActionsCellComponent
  }
};

export default SCHEMA;
