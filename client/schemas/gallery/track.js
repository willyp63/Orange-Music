import ACTIONS from '../action/track';
import { ARTIST_LINK_LOCATION } from './shared';

const SCHEMA = {
  titlePath: 'name',
  subtitlePath: 'artist.name',
  subtitleLinkLocation: ARTIST_LINK_LOCATION,
  imagePath: 'image',
  actions: ACTIONS,
};

export default SCHEMA;
