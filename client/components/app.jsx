import React from 'react';
import { Route } from 'react-router-dom';

// Static components
import NavPanelComponent from './nav_panel/nav_panel';
import PlayerBarComponent from './player_bar/player_bar';

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
        <div className="footer-container">
        </div>
      </div>
    </div>
    <div className="player-bar-container">
      <PlayerBarComponent />
    </div>
  </div>
);

export default AppComponent;
