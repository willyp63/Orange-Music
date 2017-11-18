import ACTIONS from '../action/playlist';

const SCHEMA = {
  titlePath: 'name',
  titleLabel: 'Name',
  titleLinkLocation: (_, playlist) => ({
		pathname: '/playlists/tracks',
		search: {pi: playlist.id},
	}),
  subtitlePath: '@NA',
  imagePath: 'images',
  actions: ACTIONS,
  isPlaylist: true,
};

export default SCHEMA;
