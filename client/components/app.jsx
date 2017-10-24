import React from 'react';
import { Route } from 'react-router-dom';

// Static components
import NavPanelComponent from './nav_panel/nav_panel';
import PlayerComponent from './player/player';

// Route components
import HomeComponent from './home/home';
import SearchComponent from './search/search';
import QueueComponent from './queue/queue';

const AppComponent = ({children}) => (
  <div>
    <div className="app">
      <div className="nav-panel-container">
        <NavPanelComponent />
      </div>
      <div className="content-container">
        <div className="route-container">
          <Route exact path="/" component={HomeComponent} />
          <Route path="/search" component={SearchComponent} />
          <Route path="/queue" component={QueueComponent} />
        </div>
      </div>
    </div>
    <div className="player-bar-container">
      <PlayerComponent />
    </div>
  </div>
);

export default AppComponent;
