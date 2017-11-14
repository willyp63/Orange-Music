export const ARTIST_LINK_LOCATION = (artistName) => ({
	pathname: '/search',
	search: {q: artistName, tt: 0},
});
