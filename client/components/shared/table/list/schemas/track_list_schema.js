import TextCellComponent from '../cells/text/text_cell';
import ImageCellComponent from '../cells/image/image_cell';
import MockImageCellComponent from '../cells/image/mock_image_cell';
import ActionsCellComponent from '../cells/action/action_cell';
import TRACK_ACTIONS from '../../action_schemas/track_action_schema';

const TRACK_LIST_SCHEMA = {
  image: {
    label: MockImageCellComponent,
    width: 0,
    component: ImageCellComponent,
  },
  name: {
    label: 'Title',
    width: 50,
    component: TextCellComponent,
  },
  'artist.name': {
    label: 'Artist',
    width: 50,
    component: TextCellComponent,
  },
  '@actions': {
    label: '',
    width: 0,
    component: ActionsCellComponent,
    actions: TRACK_ACTIONS,
  },
};

export default TRACK_LIST_SCHEMA;
