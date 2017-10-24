import TextCellComponent from '../cells/text/text_cell';
import ImageCellComponent, { MockImageCellComponent }from '../cells/image/image_cell';

const ARTISTS_LIST_SCHEMA = {
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
};

export default ARTISTS_LIST_SCHEMA;
