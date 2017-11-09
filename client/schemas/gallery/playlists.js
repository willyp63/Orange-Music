import PlaylistLinkChip from '../../components/shared/table/gallery/chips/playlist_link_chip';
import ACTIONS from '../action/playlist';

const SCHEMA = {
  titlePath: 'name',
  titleChipComponent: PlaylistLinkChip,
  subtitlePath: '@NA',
  imagePath: 'image',
  actions: ACTIONS,
};

export default SCHEMA;
