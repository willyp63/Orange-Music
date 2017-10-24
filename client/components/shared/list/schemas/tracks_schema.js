import TextCellComponent from '../../flex_table/cells/text_cell';
import ImageCellComponent from '../cells/image/image_cell';
import MockImageCellComponent from '../cells/image/mock_image_cell';
import ActionsCellComponent from '../cells/actions/actions_cell';
import MockActionsCellComponent from '../cells/actions/mock_actions_cell';

const ACTION_TYPES = {
  PLAY_TRACK: 0,
  ADD_TRACK_TO_QUEUE: 1,
  ADD_TRACK_TO_PLAYLIST: 2,
};

const ACTIONS = {};
ACTIONS[ACTION_TYPES.PLAY_TRACK] = {
  buttonClassName: 'play-btn',
  icon: 'play_arrow',
  actionName: 'playTrack',
};
ACTIONS[ACTION_TYPES.ADD_TRACK_TO_QUEUE] = {
  buttonClassName: 'add-to-queue-btn',
  icon: 'add',
  actionName: 'addTrackToQueue',
};
ACTIONS[ACTION_TYPES.ADD_TRACK_TO_PLAYLIST] = {
  buttonClassName: 'add-to-playlist-btn',
  icon: 'playlist_add',
  actionName: 'TODO', // TODO
};

const TRACKS_LIST_SCHEMA = {
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
    label: MockActionsCellComponent,
    width: 0,
    component: ActionsCellComponent,
    actions: ACTIONS,
  },
};

export default TRACKS_LIST_SCHEMA;
