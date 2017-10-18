import React from 'react';

import SearchBarComponent from './search_bar/search_bar';
import SearchResultsComponent from './search_results/search_results';
import PlayerBarComponent from './player_bar/player_bar';

const AppComponent = () => (
  <div>
    <div className="search-bar-container">
      <SearchBarComponent />
    </div>
    <div className="search-results-container">
      <SearchResultsComponent />
    </div>
    <PlayerBarComponent />
  </div>
);

export default AppComponent;
