nameText = document.querySelector('.playlist h2').textContent;
trackNames = document.getElementsByClassName('tracklist-name');
trackArtists = document.getElementsByClassName('artists-album');

trackQueries = '';
for (let i = 0; i < trackNames.length; i++) {
	let trackArtist = trackArtists[i].textContent;
	trackArtist = trackArtist.substring(0, trackArtist.indexOf('•'));

	if (i !== 0) { trackQueries += '\t\t'; }
	trackQueries += `"${trackNames[i].textContent} ${trackArtist}",`;
	if (i !== trackNames.length - 1) { trackQueries += '\n'; }
}

console.log(`
	const ${nameText.split(' ').map(s => s.toUpperCase()).join('_')} = {
	  name: '${nameText}',
	  trackQueries: [
	    ${trackQueries}
	  ],
	};
`);
