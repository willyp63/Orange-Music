import lastFmApi from '../api/last_fm';
import omApi from '../api/orange_music';
import { HOME_TABLE_TYPES } from '../../schemas/table_layout/home';
import { DISPLAY_TYPES } from '../../schemas/display_type';
import { concat } from './shared';


const SET_TABLE_TYPE = 'orange-music/home/SET_TABLE_TYPE';
const SET_DISPLAY_TYPE = 'orange-music/home/SET_DISPLAY_TYPE';

const FETCH_TOP_PLAYLISTS = 'orange-music/home/FETCH_TOP_PLAYLISTS';
const RECEIVE_TOP_PLAYLISTS = 'orange-music/home/RECEIVE_TOP_PLAYLISTS';

const FETCH_TOP_TRACKS = 'orange-music/home/FETCH_TOP_TRACKS';
const RECEIVE_TOP_TRACKS = 'orange-music/home/RECEIVE_TOP_TRACKS';

const FETCH_TOP_ARTISTS = 'orange-music/home/FETCH_TOP_ARTISTS';
const RECEIVE_TOP_ARTISTS = 'orange-music/home/RECEIVE_TOP_ARTISTS';


const initialState = {
  tableType: HOME_TABLE_TYPES.TOP_PLAYLISTS,
  displayType: DISPLAY_TYPES.GALLERY,
  topPlaylists: {
    playlists: [],
    isFetching: false,
    fetched: false,
  },
  topTracks: {
    tracks: [],
    isFetching: false,
  },
  topArtists: {
    artists: [],
    isFetching: false,
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_TABLE_TYPE:
      return {
        ...state,
        tableType: action.tableType,
      };
    case SET_DISPLAY_TYPE:
      return {
        ...state,
        displayType: action.displayType,
      };
    case FETCH_TOP_PLAYLISTS:
      return {
        ...state,
        topPlaylists: {
          ...state.topPlaylists,
          isFetching: true,
          fetched: false,
        },
      };
    case RECEIVE_TOP_PLAYLISTS:
      return {
        ...state,
        topPlaylists: {
          ...state.topPlaylists,
          playlists: action.playlists,
          isFetching: false,
          fetched: true,
        },
      };
    case FETCH_TOP_TRACKS:
      return {
        ...state,
        topTracks: {
          ...state.topTracks,
          isFetching: true,
        },
      };
    case RECEIVE_TOP_TRACKS:
      return {
        ...state,
        topTracks: {
          ...state.topTracks,
          tracks: concat(state.topTracks.tracks, action.tracks),
          isFetching: false,
        },
      };
    case FETCH_TOP_ARTISTS:
      return {
        ...state,
        topArtists: {
          ...state.topArtists,
          isFetching: true,
        },
      };
    case RECEIVE_TOP_ARTISTS:
      return {
        ...state,
        topArtists: {
          ...state.topArtists,
          artists: concat(state.topArtists.artists, action.artists),
          isFetching: false,
        },
      };
    default:
      return state;
  }
}


export const setHomeDisplayType = displayType => ({type: SET_DISPLAY_TYPE, displayType});
export const setHomeTableType = tableType => (dispatch, getState) => {
  dispatch({type: SET_TABLE_TYPE, tableType});
  dispatch(fetchEntities());
};

const fetchTopPlaylists = () => (dispatch, getState) => {
  const { topPlaylists } = getState().home;
  if (topPlaylists.isFetching || topPlaylists.fetched) { return; }

  dispatch({type: FETCH_TOP_PLAYLISTS});
  omApi.topPlaylists().then(({playlists}) => {
    dispatch({type: RECEIVE_TOP_PLAYLISTS, playlists});
  });
};

const fetchTopTracks = (startIdx = 0) => (dispatch, getState) => {
  const { topTracks } = getState().home;
  if (topTracks.isFetching) { return; }

  dispatch({type: FETCH_TOP_TRACKS});
  lastFmApi.topTracks({startIdx}).then(({tracks}) => {
    dispatch({type: RECEIVE_TOP_TRACKS, tracks});
  });
};

const fetchTopArtists = (startIdx = 0) => (dispatch, getState) => {
  const { topArtists } = getState().home;
  if (topArtists.isFetching) { return; }

  dispatch({type: FETCH_TOP_ARTISTS});
  lastFmApi.topArtists({startIdx}).then(({artists}) => {
    dispatch({type: RECEIVE_TOP_ARTISTS, artists});
  });
};

export const fetchEntities = () => (dispatch, getState) => {
  const { tableType, topTracks, topArtists } = getState().home;
  if (tableType === HOME_TABLE_TYPES.TOP_TRACKS) {
    if (topTracks.tracks.length === 0) { dispatch(fetchTopTracks()); }
  } else if (tableType === HOME_TABLE_TYPES.TOP_ARTISTS) {
    if (topArtists.artists.length === 0) { dispatch(fetchTopArtists()); }
  } else if (tableType === HOME_TABLE_TYPES.TOP_PLAYLISTS) {
    dispatch(fetchTopPlaylists());
  }
};

export const fetchMoreEntities = () => (dispatch, getState) => {
  const { tableType, topTracks, topArtists } = getState().home;
  if (tableType === HOME_TABLE_TYPES.TOP_TRACKS) {
    dispatch(fetchTopTracks(topTracks.tracks.length /* startIdx */));
  } else if (tableType === HOME_TABLE_TYPES.TOP_ARTISTS) {
    dispatch(fetchTopArtists(topArtists.artists.length /* startIdx */));
  }
};
