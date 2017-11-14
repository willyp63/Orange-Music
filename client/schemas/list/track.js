import TextCell from '../../components/shared/table/list/cells/text/text_cell';
import ArtistLinkCell from '../../components/shared/table/list/cells/artist_link/artist_link_cell';
import ImageCell from '../../components/shared/table/list/cells/image/image_cell';
import MockImageCell from '../../components/shared/table/list/cells/image/mock_image_cell';
import ActionsCell from '../../components/shared/table/list/cells/action/action_cell';
import ACTIONS from '../action/track';

const SCHEMA = {
  image: {
    label: MockImageCell,
    width: 0,
    component: ImageCell,
  },
  name: {
    label: 'Title',
    width: '50%',
    component: TextCell,
  },
  'artist.name': {
    label: 'Artist',
    width: '50%',
    component: ArtistLinkCell,
  },
  '@actions': {
    label: '',
    width: '0',
    component: ActionsCell,
    actions: ACTIONS,
  },
};

export default SCHEMA;
