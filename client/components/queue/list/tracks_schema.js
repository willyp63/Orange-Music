import TrackActionsCellComponent from './cells/track_actions_cell';
import MockTrackActionsCellComponent from './cells/mock_track_actions_cell';
import TRACKS_LIST_SCHEMA from '../../shared/list/schemas/tracks_schema';

const QUEUE_TRACKS_LIST_SCHEMA = Object.freeze(
  Object.assign({}, TRACKS_LIST_SCHEMA, {
    '@actions': {
      label: MockTrackActionsCellComponent,
      width: 0,
      component: TrackActionsCellComponent
    },
  })
);

export default QUEUE_TRACKS_LIST_SCHEMA;
