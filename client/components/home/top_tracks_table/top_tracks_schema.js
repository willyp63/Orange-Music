import TextCellComponent from '../../material/flex_table/cells/text_cell';
import ImageCellComponent from '../../material/flex_table/cells/image_cell';
import MockImageCellComponent from '../../material/flex_table/cells/mock_image_cell';

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
  }
});

export default SCHEMA;
