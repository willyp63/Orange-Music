import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createHashHistory } from 'history';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import AppComponent from './components/app.jsx';

import searchReducer from './reducers/search_reducer';
import playerReducer from './reducers/player_reducer';

const appStore = createStore(
  combineReducers({
    search: searchReducer,
    player: playerReducer
  }),
  {},
  applyMiddleware(thunk, logger)
);

document.addEventListener('DOMContentLoaded', (_) => {
  ReactDOM.render(
    <Provider store={appStore}>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
});
