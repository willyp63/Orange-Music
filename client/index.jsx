import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { HashRouter, Route } from 'react-router-dom';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import home from './store/modules/home';
import search from './store/modules/search';
import queue from './store/modules/queue';
import querySync from './store/query_sync/query_sync';

import AppComponent from './components/app';

const store = querySync(createStore(
  combineReducers({
    home,
    search,
    queue,
  }),
  {},
  applyMiddleware(thunk, logger)
));

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Route path="/" component={AppComponent} />
      </HashRouter>
    </Provider>,
    document.getElementById('root'));
});
