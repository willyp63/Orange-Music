import ArtistLinkChip from '../../components/shared/table/gallery/chips/artist_link_chip';
import ACTIONS from '../action/track';

const SCHEMA = {
  titlePath: 'name',
  subtitlePath: 'artist.name',
  subtitleChipComponent: ArtistLinkChip,
  imagePath: 'image',
  actions: ACTIONS,
};

export default SCHEMA;
