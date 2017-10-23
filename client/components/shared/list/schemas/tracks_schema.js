import TextCellComponent from '../../../material/flex_table/cells/text_cell';
import ImageCellComponent from '../cells/image_cell';
import MockImageCellComponent from '../cells/mock_image_cell';

const TRACKS_LIST_SCHEMA = Object.freeze({
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
});

export default TRACKS_LIST_SCHEMA;
