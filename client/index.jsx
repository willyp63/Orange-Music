import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { HashRouter, Switch, Route } from 'react-router-dom';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import AppComponent from './components/app';

import homeReducer from './reducers/home_reducer';
import searchReducer from './reducers/search_reducer';
import queueReducer from './reducers/queue_reducer';

const appStore = createStore(
  combineReducers({
    home: homeReducer,
    search: searchReducer,
    queue: queueReducer
  }),
  {},
  applyMiddleware(thunk, logger)
);

document.addEventListener('DOMContentLoaded', (_) => {
  ReactDOM.render(
    <Provider store={appStore}>
      <HashRouter>
        <Switch>
          <Route path="/" component={AppComponent} />
        </Switch>
      </HashRouter>
    </Provider>,
    document.getElementById('root'));
});
