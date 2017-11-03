import debounce from 'lodash.debounce';
import lastFmApi from '../api/last_fm';
import { SEARCH_TABLE_TYPES } from '../../schemas/table/search';
import { DISPLAY_TYPES } from '../../schemas/display';
import { concat } from './shared';

const SET_TABLE_TYPE = 'orange-music/search/SET_TABLE_TYPE';
const SET_DISPLAY_TYPE = 'orange-music/search/SET_DISPLAY_TYPE';
const SET_QUERY = 'orange-music/search/SET_QUERY';

const FETCH_TRACKS = 'orange-music/search/FETCH_TRACKS';
const RECEIVE_TRACKS = 'orange-music/search/RECEIVE_TRACKS';

const FETCH_ARTISTS = 'orange-music/search/FETCH_ARTISTS';
const RECEIVE_ARTISTS = 'orange-music/search/RECEIVE_ARTISTS';

const CLEAR_TRACKS = 'orange-music/search/CLEAR_TRACKS';
const CLEAR_ARTISTS = 'orange-music/search/CLEAR_ARTISTS';


const initialState = {
  tableType: SEARCH_TABLE_TYPES.TRACKS,
  displayType: DISPLAY_TYPES.GALLERY,
  query: '',
  tracks: {
    tracks: [],
    query: '',
    isFetching: false,
    endOfTable: false,
  },
  artists: {
    artists: [],
    query: '',
    isFetching: false,
    endOfTable: false,
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
    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case FETCH_TRACKS:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          isFetching: true,
        },
      };
    case RECEIVE_TRACKS:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          tracks: concat(state.tracks.tracks, action.tracks),
          query: action.query,
          isFetching: false,
          endOfTable: action.tracks.length === 0,
        },
      };
    case CLEAR_TRACKS:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          tracks: [],
          query: '',
          isFetching: false,
          endOfTable: false,
        },
      };
    case FETCH_ARTISTS:
      return {
        ...state,
        artists: {
          ...state.artists,
          isFetching: true,
        },
      };
    case RECEIVE_ARTISTS:
      return {
        ...state,
        artists: {
          ...state.artists,
          artists: concat(state.artists.artists, action.artists),
          query: action.query,
          isFetching: false,
          endOfTable: action.artists.length === 0,
        },
      };
    case CLEAR_ARTISTS:
      return {
        ...state,
        artists: {
          ...state.artists,
          artists: [],
          query: '',
          isFetching: false,
          endOfTable: false,
        },
      };
    default:
      return state;
  }
}


export const setSearchTableType = tableType => (dispatch, getState) => {
  dispatch({type: SET_TABLE_TYPE, tableType});
  dispatch(fetchEntities());
};

export const setSearchDisplayType = displayType => ({type: SET_DISPLAY_TYPE, displayType});

let debouncedFetch = dispatch => dispatch(fetchEntities());
debouncedFetch = debounce(debouncedFetch, 500, {maxWait: 1500});

export const setQuery = query => dispatch => {
  dispatch({type: SET_QUERY, query});
  debouncedFetch(dispatch);
};

const fetchTracks = (startIdx = 0) => (dispatch, getState) => {
  const { query, tracks } = getState().search;
  if (!tracks.isFetching && query.length > 0) {
    if (startIdx === 0) { dispatch(clearTracks()); }

    dispatch({type: FETCH_TRACKS});
    lastFmApi.searchTracks({query, startIdx}).then(({tracks}) => {
      dispatch({type: RECEIVE_TRACKS, tracks, query});
    });
  }
};

const fetchArtists = (startIdx = 0) => (dispatch, getState) => {
  const { query, artists } = getState().search;
  if (!artists.isFetching && query.length > 0) {
    if (startIdx === 0) { dispatch(clearArtists()); }

    dispatch({type: FETCH_ARTISTS});
    lastFmApi.searchArtists({query, startIdx}).then(({artists}) => {
      dispatch({type: RECEIVE_ARTISTS, artists, query});
    });
  }
};

const clearTracks = () => ({type: CLEAR_TRACKS});
const clearArtists = () => ({type: CLEAR_ARTISTS});

export const fetchEntities = () => (dispatch, getState) => {
  const { tableType, tracks, artists, query } = getState().search;
  if (tableType === SEARCH_TABLE_TYPES.TRACKS) {
    if (tracks.query !== query || (!tracks.endOfTable && tracks.tracks.length === 0)) {
      dispatch(fetchTracks());
    }
  } else if (tableType === SEARCH_TABLE_TYPES.ARTISTS) {
    if (artists.query !== query || (!artists.endOfTable && artists.artists.length === 0)) {
      dispatch(fetchArtists());
    }
  }
};

export const fetchMoreEntities = () => (dispatch, getState) => {
  const { tableType, tracks, artists } = getState().search;
  if (tableType === SEARCH_TABLE_TYPES.TRACKS) {
    dispatch(fetchTracks(tracks.tracks.length /* startIdx */));
  } else if (tableType === SEARCH_TABLE_TYPES.ARTISTS) {
    dispatch(fetchArtists(artists.artists.length /* startIdx */));
  }
};
