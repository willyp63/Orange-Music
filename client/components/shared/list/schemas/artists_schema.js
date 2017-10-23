import TextCellComponent from '../../flex_table/cells/text_cell';
import ImageCellComponent from '../cells/image_cell';
import MockImageCellComponent from '../cells/mock_image_cell';

const ARTISTS_LIST_SCHEMA = Object.freeze({
  image: {
    label: MockImageCellComponent,
    width: 0,
    component: ImageCellComponent
  },
  name: {
    label: 'Name',
    width: 100,
    component: TextCellComponent
  },
});

export default ARTISTS_LIST_SCHEMA;
