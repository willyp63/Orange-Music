import ReduxQuerySync from './redux_query_sync';
import { setHomeTableType, setHomeDisplayType } from '../modules/home';
import { setQuery, setSearchTableType, setSearchDisplayType } from '../modules/search';
import { setQueueTableType, setQueueDisplayType } from '../modules/queue';

// Search Query
const q = {
  selector: state => state.search.query,
  action: query => setQuery(query),
  defaultValue: '',
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
      tt,
      dt,
    },
    initialTruth: 'location',
    replaceState: true,
  });
};

export default querySync;
