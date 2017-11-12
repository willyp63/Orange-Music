import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import history from '../history';
import { startSessionFromLocalStorage } from '../store/modules/session';

import NavPanel from './nav_panel';
import Form from './form';
import Player from './player/player';
import Home from './home/home';
import Search from './search/search';
import Queue from './queue/queue';
import Playlists from './playlists/playlists';
import PlaylistDetail from './playlists/detail/playlist_detail';

class App extends React.Component {
  constructor(props) {
    super(props);
    this._willMountRoute = this._willMountRoute.bind(this);

    props.startSessionFromLocalStorage();
  }
  componentWillReceiveProps(newProps) {
    this._willMountRoute(newProps);
  }
  _willMountRoute(newProps) {
    const pathname = history.location.pathname;
    switch (pathname) {
      case '/playlists':
      case '/playlists/tracks':
        this._willMountProtectedRoute(newProps, pathname);
        break;
    }
    this.lastPathname = pathname;
  }
  _willMountProtectedRoute(newProps, pathname) {
    if (!newProps.isLoggingIn && !newProps.user) {
      const newPathname = this.lastPathname !== pathname
        ? (this.lastPathname || '/')
        : '/';
      history.pushLocation(newPathname);
    }
  }
  render() {
    return (
      <div>
        <div className="om-app-bg"></div>
        <div className="om-app">
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/queue" component={Queue} />
          <Route exact path="/playlists" component={Playlists} />
          <Route exact path="/playlists/tracks" component={PlaylistDetail} />
        </div>
        <NavPanel />
        <Player />
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
