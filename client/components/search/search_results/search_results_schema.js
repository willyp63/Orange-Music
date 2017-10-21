import TextCellComponent from '../../shared/flex_table/cells/text_cell';
import ImageCellComponent from '../../shared/flex_table/cells/image_cell';
import MockImageCellComponent from '../../shared/flex_table/cells/mock_image_cell';
import ActionsCellComponent from './cells/actions_cell';
import MockActionsCellComponent from './cells/mock_actions_cell';

const SCHEMA = Object.freeze({
  image: {
    label: MockImageCellComponent,
    width: 0,
    component: ImageCellComponent
  },
  name: {
    label: 'Track',
    width: 50,
    component: TextCellComponent
  },
  artist: {
    label: 'Artist',
    width: 50,
    component: TextCellComponent
  },
  '@actions': {
    label: MockActionsCellComponent,
    width: 0,
    component: ActionsCellComponent
  }
});

export default SCHEMA;
