import React from 'react';
import { Route } from 'react-router-dom';

// Static components
import NavPanelComponent from './nav_panel/nav_panel';
import PlayerBarComponent from './player_bar/player_bar';

// Route components
import SearchComponent from './search/search';
import HomeComponent from './home/home';

const AppComponent = ({children}) => (
  <div className="app">
    <div className="nav-panel-container">
      <NavPanelComponent />
    </div>
    <div className="content-container">
      <Route exact path="/" component={HomeComponent} />
      <Route path="/search" component={SearchComponent} />
    </div>
    <PlayerBarComponent />
  </div>
);

export default AppComponent;
