import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MatButton from '../shared/button';
import { blue_darken_1, blue } from '../shared/color';

import lastFmApi from '../../api/last_fm/last_fm_api';

import { searchTracks } from '../../actions/search_actions';

import { getUrlWithUpdatedParams, getUrlParams } from '../../util/url';
import { isNotEmpty } from '../../util/empty';

class SearchFormComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.query,
      page: props.page,
      pageSize: props.pageSize
    };
    this.makeQuery.bind(this)();
  }
  onQuery(e) {
    e.preventDefault();
    this.makeQuery.bind(this)();
    this.updateUrl.bind(this)();
  }
  onQueryChange(newQuery) {
    this.setState((oldState) => Object.assign(oldState, {query: newQuery}));
  }
  makeQuery() {
    this.props.makeQuery({
      query: this.state.query,
      page: this.state.page,
      pageSize: this.state.pageSize
    });
  }
  updateUrl() {
    const currentUrl = this.props.location.pathname + this.props.location.search;
    const newUrl = getUrlWithUpdatedParams('/', {
      q: this.state.query,
      pg: this.state.page,
      pgs: this.state.pageSize
    });
    if (currentUrl !== newUrl) { this.props.history.push(newUrl); }
  }
  render() {
    return (
      <div className="search-form">
        <img src="/static/images/logo.png"
             className="orange-image" />
        <form onSubmit={(e) => this.onQuery.bind(this, e)()}>
          <div className="orange-music-label">Orange Music</div>
          <div className="query-input">
            <input type="text"
                   autoComplete="off"
                   value={this.state.query}
                   placeholder="Search for tracks ..."
                   onChange={(e) => this.onQueryChange.bind(this, e.target.value)()}>
            </input>
            <MatButton buttonClassName={'search-btn'}
                       iconName={'search'}
                       bgColor={blue_darken_1}
                       bgColorHover={blue}
                       isSubmit={true}>
            </MatButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const urlParams = getUrlParams(ownProps.location.search);
  const query = isNotEmpty(urlParams.q)
    ? decodeURIComponent(urlParams.q)
    : '';
  const page = isNotEmpty(urlParams.pg)
    ? parseInt(urlParams.pg)
    : 1;
  const pageSize = isNotEmpty(urlParams.pgs)
    ? parseInt(urlParams.pgs)
    : lastFmApi.DEFAULT_PAGE_SIZE;
  return {query, page, pageSize};
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeQuery: ({query, page, pageSize}) => {
      dispatch(searchTracks({query, page, pageSize}));
    }
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormComponent));
