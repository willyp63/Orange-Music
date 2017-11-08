import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import history from '../history';
import { startSessionFromLocalStorage } from '../store/modules/session';

import NavPanel from './nav_panel/nav_panel';
import Player from './player/player';
import Form from './form/form';
import Home from './home/home';
import Search from './search/search';
import Queue from './queue/queue';
import Playlists from './playlists/playlists';

class App extends React.Component {
  constructor(props) {
    super(props);
    this._willMountRoute = this._willMountRoute.bind(this);

    props.startSessionFromLocalStorage();
    this._willMountRoute(props);
  }
  componentWillReceiveProps(newProps) {
    this._willMountRoute(newProps);
  }
  _willMountRoute(newProps) {
    const pathname = history.location.pathname;
    switch (pathname) {
      case '/playlists':
        this._willMountProtectedRoute(newProps);
        break;
    }
    this.lastPathname = pathname;
  }
  _willMountProtectedRoute(newProps) {
    if (!newProps.isLoggingIn && !newProps.user) {
      history.pushLocation(this.lastPathname || '/');
    }
  }
  render() {
    return (
      <div>
        <div className="app">
          <div className="nav-panel-container">
            <NavPanel />
          </div>
          <div className="content-container">
            <div className="route-container">
              <Route exact path="/" component={Home} />
              <Route path="/search" component={Search} />
              <Route path="/queue" component={Queue} />
              <Route path="/playlists" component={Playlists} />
            </div>
          </div>
        </div>
        <div className="player-container">
          <Player />
        </div>
        <Form />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggingIn: state.session.isLoggingIn,
    user: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startSessionFromLocalStorage: () => { dispatch(startSessionFromLocalStorage()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
