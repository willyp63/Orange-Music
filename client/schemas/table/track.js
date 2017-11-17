import ACTIONS from '../action/track';
import { ARTIST_LINK_LOCATION } from './shared';

const SCHEMA = {
  titlePath: 'name',
  titleLabel: 'Name',
  subtitlePath: 'artist.name',
  subtitleLabel: 'Artist',
  subtitleLinkLocation: ARTIST_LINK_LOCATION,
  imagePath: 'image',
  actions: ACTIONS,
};

export default SCHEMA;
