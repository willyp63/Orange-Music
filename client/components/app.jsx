import React from 'react';

import SearchBarComponent from './search_bar/search_bar';
import SearchResultsComponent from './search_results/search_results';
import PlayerBarComponent from './player_bar/player_bar';

const AppComponent = () => (
  <div>
    <div>Orange Music</div>
    <SearchBarComponent />
    <br />
    <SearchResultsComponent />
    <br />
    <PlayerBarComponent />
  </div>
);

export default AppComponent;
