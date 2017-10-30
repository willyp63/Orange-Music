import ArtistLinkChip from '../chips/artist_link_chip';

const ARTIST_GALLERY_SCHEMA = {
  titlePath: 'name',
  titleChipComponent: ArtistLinkChip,
  subtitlePath: '@NA',
  imagePath: 'image',
  actions: {},
};

export default ARTIST_GALLERY_SCHEMA;
