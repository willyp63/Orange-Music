import React from 'react';
import { Route } from 'react-router-dom';
import NavPanel from './nav_panel/nav_panel';
import Player from './player/player';
import Home from './home/home';
import Search from './search/search';
import Queue from './queue/queue';
import Signup from './signup/signup';

const App = () => (
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
          <Route path="/signup" component={Signup} />
        </div>
      </div>
    </div>
    <div className="player-container">
      <Player />
    </div>
  </div>
);

export default App;
