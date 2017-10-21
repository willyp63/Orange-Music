import TextCellComponent from '../shared/flex_table/cells/text_cell';
import ImageCellComponent from '../shared/flex_table/cells/image_cell';
import ActionsCellComponent from './queue_table/cells/actions_cell';

const SCHEMA = Object.freeze({
  image: {
    order: 0,
    label: null,
    width: 8,
    component: ImageCellComponent
  },
  name: {
    order: 1,
    label: 'Track',
    width: 43,
    component: TextCellComponent
  },
  artist: {
    order: 2,
    label: 'Artist',
    width: 43,
    component: TextCellComponent
  },
  '@actions': {
    order: 3,
    label: null,
    width: 6,
    component: ActionsCellComponent
  }
});

export default SCHEMA;
