import TextCellComponent from '../../material/flex_table/cells/text_cell';
import ImageCellComponent from '../../shared/list/cells/image_cell';
import MockImageCellComponent from '../../shared/list/cells/mock_image_cell';
import ActionsCellComponent from './cells/actions_cell';
import MockActionsCellComponent from './cells/mock_actions_cell';

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
