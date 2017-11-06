import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { logInUserFromLocalStorage } from '../store/modules/session';

import NavPanel from './nav_panel/nav_panel';
import Player from './player/player';
import Home from './home/home';
import Search from './search/search';
import Queue from './queue/queue';
import SignUp from './sign_up/sign_up';
import LogIn from './log_in/log_in';
import Account from './account/account';
import Playlists from './playlists/playlists';

class App extends React.Component {
  constructor(props) {
    super(props);
    props.logInUserFromLocalStorage();
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
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/account" component={Account} />
              <Route path="/playlists" component={Playlists} />
            </div>
          </div>
        </div>
        <div className="player-container">
          <Player />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logInUserFromLocalStorage: () => { dispatch(logInUserFromLocalStorage()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
