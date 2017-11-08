import PlaylistLinkCell from '../../components/shared/table/list/cells/playlist_link/playlist_link_cell';
import ImageCell from '../../components/shared/table/list/cells/image/image_cell';
import MockImageCell from '../../components/shared/table/list/cells/image/mock_image_cell';

const SCHEMA = {
  image: {
    label: MockImageCell,
    width: 0,
    component: ImageCell,
  },
  name: {
    label: 'Name',
    width: '100%',
    component: PlaylistLinkCell,
  },
};

export default SCHEMA;
