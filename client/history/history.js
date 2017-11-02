import createHistory from 'history/createBrowserHistory';
import URLSearchParams from 'url-search-params';

const history = createHistory();

history.pushLocation = (pathname, search) => {
  const location = history.location;
  const locationParams = new URLSearchParams(location.search);

  Object.keys(search).forEach(param => {
    locationParams.set(param, search[param]);
  });

  search = `?${locationParams}`;
  const oldSearch = location.search || '?';

  if (search !== oldSearch || pathname !== location.pathname) {
    const newLocation = {
      pathname,
      search,
      hash: location.hash,
      state: location.state,
    };
    history.push(newLocation);
  }
};

export default history;
