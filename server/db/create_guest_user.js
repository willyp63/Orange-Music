const lastFmApi = require('../api_util/last_fm');

module.exports = (async (client) => {
	try {
		await client.query(insertUser('Guest', 'ornery_for_oranges'));
		const userId = (await client.query(getUser('Guest'))).rows[0].id;

		await createPlaylist(client, userId, 'Dance Party', DANCE_PARTY);
		await createPlaylist(client, userId, 'Totally Alternative', TOTALLY_ALT);
		await createPlaylist(client, userId, 'Country Nights', COUNTRY_NIGHTS);
		await createPlaylist(client, userId, 'Ultimate Indie', ULTIMATE_INDIE);
	} catch (e) {
		if (e.constraint === 'users_name_key') {
      // Do nothing. User already exists.
    } else {
    	throw e;
    }
	}
});

const createPlaylist = async (client, userId, playlistName, trackQuerys) => {
	console.log(`Creating playlist: ${playlistName}`);
	await client.query(insertPlaylist(userId, playlistName));
	let playlistId = (await client.query(getPlaylist(userId, playlistName))).rows[0].id;
	for (let i = 0; i < trackQuerys.length; i++) {
		console.log(`Adding track: ${trackQuerys[i]}`);
		await addTrackToPlaylist(client, userId, playlistId, trackQuerys[i]);
	}
};


const addTrackToPlaylist = async (client, userId, playlistId, trackQuery) => {
	const tracks = await lastFmApi.searchTracks({query: trackQuery, pageSize: 1});
	let track = tracks.tracks[0];
	if (!track) { return; }

  // Insert Track
  try {
    await client.query(insertTrack(track.mbid, track.name, track.artist.name, JSON.stringify(track.image)));
  } catch (e) {
    if (e.constraint === 'tracks_name_artist_name_key') {
      // Database error indicates that track is already in table.
      //
      // Do nothing, this is fine.
    } else {
      throw e;
    }
  }

  // Fetch Track
  track = (await client.query(getTrack(track.name, track.artist.name))).rows[0];

  // Add to Playlist
  try {
    await client.query(insertPlaylistAdd(userId, playlistId, track.id));
  } catch (e) {
    if (e.constraint === 'playlist_adds_playlist_id_track_id_key') {
      // Database error indicates that track is already added to playlist.
      //
      // Do nothing, this is fine.
    } else {
      throw e;
    }
  }
}

const DANCE_PARTY = [
	"Let's Go Lucas & Steve, Mike Williams, Curbi",
	"Intoxicated - Radio Edit Martin Solveig, GTA",
	"Light It Up - Remix Major Lazer, Nyla, Fuse ODG",
	"I Need A Painkiller - Armand Van Helden Vs. Butter Rush Armand Van Helden, Butter Rush",
	"Mi Gente - 4B Remix J Balvin, Willy William, 4B",
	"How Deep Is Your Love - Chris Lake Remix Calvin Harris, Disciples, Chris Lake",
	"Boomerang Brooks, Grx",
	"Get Lost Paul Damixie",
	"Hit The Road Jack Throttle",
	"Would You Ever Skrillex, Poo Bear",
	"Unforgettable - Tiësto vs. Dzeko AFTR:HRS Remix French Montana, Swae Lee, Tiësto, Dzeko",
	"Summertime Sadness (Lana Del Rey Vs. Cedric Gervais) - Cedric Gervais Remix / Radio Edit Lana Del Rey, Cedric Gervais",
	"All I Know EDX",
	"Love On Me - CID Remix Galantis, Hook N Sling, CID",
	"Booty Bounce - Radio Edit Tujamo",
	"Cutting Shapes Don Diablo",
	"Phunky Beats (Ft. Jvst Say Yes) Ephwurd, JVST SAY YES",
	"All This Jay Pryor",
	"Do It Right Martin Solveig, Tkay Maidza",
	"Ruff Like This Watermät, Pep & Rash",
	"Livin' 4 Ya MOTi, Katt Niall",
	"Million Voices - Radio Edit Otto Knows",
	"Tonight Don Diablo",
	"Keep It Low Afrojack, Mightyfools",
	"Turn Me Up - ViP Mix MOTi, Nabiha",
	"The Fever Bassjackers, Breathe Carolina, APEK",
	"Together As One - Radio Edit Dropgun",
	"Viento Gianluca Vacchi",
	"You Don't Know Me Jax Jones, RAYE",
	"Show of Hands (with LöKii & Mr. Tape) Kaskade, LöKii, Mr. Tape",
	"House Work Jax Jones, Mike Dunn, MNEK",
	"Let Me Love You - Don Diablo Remix DJ Snake, Don Diablo, Justin Bieber",
	"Waiting Oliver Heldens, Throttle",
	"The Jam Kideko",
	"BOOM Tiësto, Sevenn",
	"Forever Martin Garrix, Matisse & Sadko",
	"AnyTime Don Diablo",
	"Eternia Dave202",
	"When The Funk Drops Deorro, Uberjak'd, Far East Movement",
	"This Girl (Kungs Vs. Cookin' On 3 Burners) - Kungs Vs. Cookin' On 3 Burners Kungs, Cookin' On 3 Burners",
	"Carry You Home - Tiësto's Big Room Mix Tiësto, Stargate, Aloe Blacc",
	"Coco Puffs (Feat. u.n.i) Black Caviar, u.n.i",
	"Do It... The Way I Do It Black Caviar",
	"Magic City Wahlstedt",
	"Ba Da Da Ding Eva Shaw, Demarco, Aîon",
	"Shingaling Tom Swoon",
	"Scream Tiësto, John Christian",
	"Let It Ring Damien N-Drix, STV",
	"Work Your Body Funkerman, Cooperated Souls",
	"Raw Madison Mars",
];

const COUNTRY_NIGHTS = [
  "Don't It Billy Currington",
  "Gonna Wanna Tonight Chase Rice",
  "All On Me Devin Dawson",
  "It Goes Like This Thomas Rhett",
  "Home Alone Tonight Luke Bryan, Karen Fairchild",
  "Wanna Be That Song Brett Eldredge",
  "May We All Florida Georgia Line, Tim McGraw",
  "Go Ahead and Break My Heart (feat. Gwen Stefani) Blake Shelton, Gwen Stefani",
  "T-Shirt Thomas Rhett",
  "Yeah Boy Kelsea Ballerini",
  "Drink to That All Night Jerrod Niemann",
  "Play It Again Luke Bryan",
  "Dirt Road Anthem Jason Aldean",
  "Star Of The Show Thomas Rhett",
  "Parachute Chris Stapleton",
  "Hurricane Luke Combs",
  "Huntin', Fishin' And Lovin' Every Day Luke Bryan",
  "Body Like A Back Road Sam Hunt",
  "Beat Of The Music Brett Eldredge",
  "Baby Be My Love Song Easton Corbin",
  "Make Me Wanna Thomas Rhett",
  "Yeah Joe Nichols",
  "Different For Girls Dierks Bentley, Elle King",
  "Anything Goes Florida Georgia Line",
  "Nowhere Fast Old Dominion",
  "Highway Don't Care Tim McGraw, Taylor Swift, Keith Urban",
  "Leave The Night On Sam Hunt",
  "Ready Set Roll Chase Rice",
  "I Don't Want This Night to End Luke Bryan",
  "Any Ol' Barstool Jason Aldean",
  "Single For The Summer Sam Hunt",
  "Head Over Boots Jon Pardi",
  "Dirt Florida Georgia Line",
  "Springsteen Eric Church",
  "Craving You Thomas Rhett, Maren Morris",
  "House Party Sam Hunt",
  "Blue Ain't Your Color Keith Urban",
  "Carolina Can Chase Rice",
  "Stay A Little Longer Brothers Osborne",
  "Die A Happy Man Thomas Rhett",
  "Make You Miss Me Sam Hunt",
  "I'm Comin' Over Chris Young",
  "Close Ryan Kinder",
  "How Country Feels Randy Houser",
  "H.O.L.Y. Florida Georgia Line",
  "Somethin' 'Bout A Truck Kip Moore",
  "Yours Russell Dickerson",
  "What Ifs Kane Brown, Lauren Alaina",
  "Runnin' Outta Moonlight Randy Houser",
];

const TOTALLY_ALT = [
  "Freeze Me Death From Above 1979",
  "So Tied Up - moreBishop Cold War Kids, Bishop Briggs",
  "I Only Lie When I Love You Royal Blood",
  "Light The Way Mikky Ekko",
  "Swallow Teenage Wrist",
  "Bottom Of The Deep Blue Sea MISSIO",
  "Fight Milk Only Shadows",
  "Giver K.Flay",
  "Coming Down Big Spring",
  "Youth Hundredth",
  "Holy Mountain Noel Gallagher's High Flying Birds",
  "Sober Up AJR, Rivers Cuomo",
  "Ceasefire Judas",
  "Fire Alarm Castlecomer",
  "Sickago - Bonus Track Deaf Havana",
  "Heel Theme Mansions",
  "Little One Highly Suspect",
  "Young Lady, You're Scaring Me Ron Gallo",
  "T-Shirt Song DON BROCO",
  "Passion AWOLNATION",
  "Whatever Forever Sego",
  "Thank God I'm Not You Himalayas",
  "We Fight Dashboard Confessional",
  "High Sir Sly",
  "hometown cleopatrick",
  "Hold It Down Island Apollo",
  "Painkiller DREAMERS",
  "It's A Trip! Joywave",
  "Captivate You Marmozets",
  "Everything Is Alright The Glorious Sons",
  "Bury Me Face Down grandson",
  "Safari Song Greta Van Fleet",
  "I Found God Mainland",
  "Be Your Man Demob Happy",
  "Had Enough Lower Than Atlantis",
  "They Put A Body In The Bayou The Orwells",
  "Black Holes (Solid Ground) The Blue Stones",
  "Levitate The Palms",
  "Enter Entirely Cloud Nothings",
  "Sea Change Thrice",
  "Someday Pale Seas",
  "Washed Up Bel Heir",
  "Thunder Mondo Cozmo",
  "Walk On Water Thirty Seconds To Mars",
  "The Way You Used To Do Queens of the Stone Age",
  "Pretty Girls on Bikes dubé",
  "I Love You, Will You Marry Me YUNGBLUD",
  "The Deepest Sighs, the Frankest Shadows Gang of Youths",
  "Golden Age Late Night Episode",
  "Baby Royal Republic",
];

const ULTIMATE_INDIE = [
  "Yam Yam No Vacation",
  "Panopticon Cloud Control",
  "Nervous Magic Bronson",
  "Chateau Angus & Julia Stone",
  "Super Natural Turnover",
  "Appointments Julien Baker",
  "Still Beating Mac Demarco",
  "Paola Shout Out Louds",
  "Begin (feat. Wales) Shallou, Wales",
  "Alison Swimming Tapes",
  "You Would Have to Lose Your Mind The Barr Brothers",
  "Come Home The Undercover Dream Lovers",
  "Astronaut - Something About Your Love Mansionair",
  "On Script Courtney Barnett, Kurt Vile",
  "Feeling Grad Party",
  "Magic Tide Frills",
  "Thin Aquilo",
  "Fix Me Beck",
  "Going Home Twist",
  "Bike Dream Rostam",
  "Bad Ones (feat. Tegan and Sara) Matthew Dear, Tegan and Sara",
  "Dive Tim Atlas",
  "Compromised Tim Atlas",
  "Pain The War On Drugs",
  "Tailwhip Men I Trust",
  "Defibrillation The Barr Brothers, Lucius",
  "Spiral Wye Oak",
  "Floating Marlin's Dreaming",
  "Mystik Tash Sultana",
  "Little Dark Age MGMT",
  "Live Well Palace",
  "Mind Hijacker's Curse Chad VanGaalen",
  "Black Out Days - Future Islands Remix Phantogram, Future Islands",
  "Surf Common Tiger",
  "I Saw The End Ardency",
  "Not My Baby Alvvays",
  "Carnation Yumi Zouma",
  "Mountain To Move Nick Mulvey",
  "The Sun Myd",
  "Hawaiian License Plates. Jaws of Love.",
  "Beam Petit Biscuit",
  "Vow TENDER",
  "Born to Beg The National",
  "Dissolve Kllo",
  "Olly Cape Francis",
  "lucid slenderbodies",
  "Yours Now, Now",
  "They Came Along Haulm",
  "Continental Breakfast Courtney Barnett, Kurt Vile",
  "After Slice Ivory Waves",
];


const insertUser = (name, password) => ({
  text: `
    INSERT INTO users(name, password)
    VALUES ($1, $2);
  `,
  values: [name, password],
});

const getUser = (name) => ({
  text: `
    SELECT * from users
    WHERE name = $1;
  `,
  values: [name],
});

const insertPlaylist = (userId, name) => ({
  text: `
    INSERT INTO playlists(user_id, name)
    VALUES ($1, $2);
  `,
  values: [userId, name],
});

const insertTrack = (mbid, name, artistName, image) => ({
  text: `
    INSERT INTO tracks(mbid, name, artist_name, image)
    VALUES ($1, $2, $3, $4);
  `,
  values: [mbid, name, artistName, image],
});

const insertPlaylistAdd = (userId, playlistId, trackId) => ({
  text: `
    INSERT INTO playlist_adds(user_id, playlist_id, track_id)
    VALUES ($1, $2, $3);
  `,
  values: [userId, playlistId, trackId],
});

const getTrack = (name, artistName) => ({
  text: `
    SELECT * FROM tracks
    WHERE name = $1 AND artist_name = $2;
  `,
  values: [name, artistName],
});

const getPlaylist = (userId, name) => ({
  text: `
    SELECT * FROM playlists
    WHERE user_id = $1 AND name = $2;
  `,
  values: [userId, name],
});
