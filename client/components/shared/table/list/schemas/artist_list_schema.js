import ArtistLinkCellComponent from '../cells/artist_link/artist_link_cell';
import ImageCellComponent from '../cells/image/image_cell';
import MockImageCellComponent from '../cells/image/mock_image_cell';

const ARTIST_LIST_SCHEMA = {
  image: {
    label: MockImageCellComponent,
    width: 0,
    component: ImageCellComponent
  },
  name: {
    label: 'Name',
    width: '100%',
    component: ArtistLinkCellComponent
  },
};

export default ARTIST_LIST_SCHEMA;
