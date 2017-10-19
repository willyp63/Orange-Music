import React from 'react';

import NavBar from './nav_bar/nav_bar';
import SearchResultsComponent from './search_results/search_results';
import PlayerBarComponent from './player_bar/player_bar';

const AppComponent = () => (
  <div>
    <NavBar />
    <div className="search-results-container">
      <SearchResultsComponent />
    </div>
    <PlayerBarComponent />
  </div>
);

export default AppComponent;
