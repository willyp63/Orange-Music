import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import home from './store/modules/home';
import search from './store/modules/search';
import queue from './store/modules/queue';
import signUp from './store/modules/sign_up';
import logIn from './store/modules/log_in';
import session from './store/modules/session';

import querySync from './store/query_sync/query_sync';
import history from './history/history';
import App from './components/app';

const store = createStore(
  combineReducers({
    home,
    search,
    queue,
    signUp,
    logIn,
    session,
  }),
  {},
  applyMiddleware(thunk, logger)
);

// Sync store with url query params
querySync(store, history);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </Provider>,
    document.getElementById('root'));
});
