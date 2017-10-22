import React from 'react';
import ReactDOM from 'react-dom';

import SearchFormComponent from './search_form/search_form';
import SearchResultsComponent from './search_results/search_results';
import SearchResultsHeaderComponent from './search_results/search_results_header';

const BOX_SHADOW_STYLE = Object.freeze({
  'border-bottom': '1px solid rgba(0, 0, 0, 0)',
  'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
});

const BORDER_STYLE = Object.freeze({
  'border-bottom': '1px solid #e0e0e0',
  'box-shadow': 'none'
});

class SearchComponent extends React.Component {
  componentDidMount() {
    this.scrollHandler = this.updateNavBarStyle.bind(this);
    $(document).scroll(this.scrollHandler);
    this.scrollHandler();

    // Focus input when you first visit route.
    $('.search .search-form-container input').focus();
  }
  componentWillUnmount() {
    $(document).off('scroll', this.scrollHandler);
  }
  updateNavBarStyle() {
    const style = $(window).scrollTop() !== 0
      ? BOX_SHADOW_STYLE
      : BORDER_STYLE;
    $(ReactDOM.findDOMNode(this))
      .find('.nav-bar')
      .css(style);
  }
  render() {
    return (
      <div className="search">
        <div className="nav-bar">
          <div className="search-form-container">
            <SearchFormComponent />
          </div>
          <div className="search-results-header-container">
            <SearchResultsHeaderComponent />
          </div>
        </div>
        <div className="search-results-container">
          <SearchResultsComponent />
        </div>
      </div>
    );
  }
}

export default SearchComponent;
