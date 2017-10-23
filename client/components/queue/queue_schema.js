import TextCellComponent from '../material/flex_table/cells/text_cell';
import ImageCellComponent from '../material/flex_table/cells/image_cell';
import MockImageCellComponent from '../material/flex_table/cells/mock_image_cell';
import ActionsCellComponent from './queue_table/cells/actions_cell';
import MockActionsCellComponent from './queue_table/cells/mock_actions_cell';

const SCHEMA = Object.freeze({
  image: {
    label: MockImageCellComponent,
    width: 0,
    component: ImageCellComponent
  },
  name: {
    label: 'Title',
    width: 50,
    component: TextCellComponent
  },
  'artist.name': {
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
