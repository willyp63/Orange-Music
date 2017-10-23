import TextCellComponent from '../../../material/flex_table/cells/text_cell';
import ImageCellComponent from '../cells/image_cell';
import MockImageCellComponent from '../cells/mock_image_cell';
import TrackActionsCellComponent from '../cells/track_actions_cell';
import MockTrackActionsCellComponent from '../cells/mock_track_actions_cell';

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
  '@actions': {
    label: MockTrackActionsCellComponent,
    width: 0,
    component: TrackActionsCellComponent
  },
});

export default TRACKS_LIST_SCHEMA;
