import TextCell from '../../components/shared/table/list/cells/text/text_cell';
import ImageCell from '../../components/shared/table/list/cells/image/image_cell';
import MockImageCell from '../../components/shared/table/list/cells/image/mock_image_cell';

const SCHEMA = {
  image: {
    label: MockImageCell,
    width: 0,
    component: ImageCell
  },
  name: {
    label: 'Name',
    width: '100%',
    component: TextCell
  },
};

export default SCHEMA;
