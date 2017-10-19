import React from 'react';

import SearchFormComponent from '../search_form/search_form';
import SearchResultsHeaderComponent from '../search_results/search_results_header';

const BOX_SHADOW_STYLE = Object.freeze({
  border: '1px solid rgba(0, 0, 0, 0)',
  'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
});

const BORDER_STYLE = Object.freeze({
  border: '1px solid #e0e0e0',
  'box-shadow': 'none'
});

class NavBar extends React.Component {
  componentDidMount() {
    $(document).scroll(updateNavBarStyle);
    updateNavBarStyle();
  }
  componentWillUnmount() {
    $(document).off('scroll', updateNavBarStyle);
  }
  render() {
    return (
      <div className="nav-bar">
        <div className="search-form-container">
          <SearchFormComponent />
        </div>
        <div className="search-results-header-container">
          <SearchResultsHeaderComponent />
        </div>
      </div>
    );
  }
}

const updateNavBarStyle = (_) => {
  $('.nav-bar').css($(window).scrollTop() !== 0
      ? BOX_SHADOW_STYLE
      : BORDER_STYLE);
};

export default NavBar;
