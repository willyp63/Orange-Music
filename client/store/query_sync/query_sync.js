import ReduxQuerySync from './redux_query_sync';
import { setHomeTableType, setHomeDisplayType } from '../modules/home';
import { setQuery, fetchEntities, setSearchTableType, setSearchDisplayType } from '../modules/search';
import { setQueueTableType, setQueueDisplayType } from '../modules/queue';
import { setPlaylistsDisplayType } from '../modules/playlists';
import { setPlaylistId } from '../modules/playlist_detail';

// Search Query
const q = {
  selector: state => state.search.query,
  action: query => dispatch => {
    dispatch(setQuery(query));
    dispatch(fetchEntities());
  },
  defaultValue: '',
};

// Playlist Id
const pi = {
  selector: state => state.playlistDetail.playlistId,
  action: playlistId => dispatch => {
    dispatch(setPlaylistId(playlistId));
  },
  defaultValue: -1,
  stringToValue: string => Number.parseInt(string) || -1,
  valueToString: value => `${value}`,
};

// Table Type
const tt = {
  selector: (state, location) => {
    switch (location.pathname) {
      case '/search':
        return state.search.tableType;
      case '/queue':
        return state.queue.tableType;
      default:
        return state.home.tableType;
    }
  },
  action: (tableType, location) => {
    switch (location.pathname) {
      case '/search':
        return setSearchTableType(tableType);
      case '/queue':
        return setQueueTableType(tableType);
      default:
        return setHomeTableType(tableType);
    }
  },
  defaultValue: '0',
};


// Display Type
const dt = {
  selector: (state, location) => {
    switch (location.pathname) {
      case '/search':
        return state.search.displayType;
      case '/queue':
        return state.queue.displayType;
      case '/playlists':
        return state.playlists.displayType;
      default:
        return state.home.displayType;
    }
  },
  action: (displayType, location) => {
    switch (location.pathname) {
      case '/search':
        return setSearchDisplayType(displayType);
      case '/queue':
        return setQueueDisplayType(displayType);
      case '/playlists':
        return setPlaylistsDisplayType(displayType);
      default:
        return setHomeDisplayType(displayType);
    }
  },
  defaultValue: '0',
};


const querySync = (store, history) => {
  ReduxQuerySync({
    store,
    history,
    params: {
      q,
      pi,
      tt,
      dt,
    },
    initialTruth: 'location',
    replaceState: true,
  });
};

export default querySync;
