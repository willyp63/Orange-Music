import React from 'react';
import { Route } from 'react-router-dom';

// Static components
import NavPanel from './nav_panel/nav_panel';
import Player from './player/player';

// Route components
import Home from './home/home';
import Search from './search/search';
import Queue from './queue/queue';

const App = ({children}) => (
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
          <Route path="/home" component={Home} />
        </div>
      </div>
    </div>
    <div className="player-container">
      <Player />
    </div>
  </div>
);

export default App;
