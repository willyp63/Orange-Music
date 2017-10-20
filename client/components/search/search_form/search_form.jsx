import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import MatButtonComponent from '../../shared/mat_button/mat_button';
import { blue_darken_1, blue } from '../../shared/mat_color/mat_color';

import lastFmApi from '../../../api/last_fm/last_fm_api';

import { searchTracks } from '../../../actions/search_actions';

import { getUrlWithUpdatedParams, getUrlParams } from '../../../util/url';
import { isNotEmpty, isEmpty } from '../../../util/empty';

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
    const { query, page, pageSize } = this.state;
    if (isEmpty(query) || query === this.lastQuery) { return; }
    this.props.makeQuery({
      query: query,
      page: page,
      pageSize: pageSize
    });
    this.lastQuery = query;
  }
  updateUrl() {
    const { pathname, search } = this.props.location;
    const currentUrl = pathname + search;
    const newUrl = getUrlWithUpdatedParams(pathname, {
      q: this.state.query,
      pg: this.state.page,
      pgs: this.state.pageSize
    });
    if (currentUrl !== newUrl) { this.props.history.push(newUrl); }
  }
  render() {
    return (
      <form className="search-form"
            onSubmit={(e) => this.onQuery.bind(this, e)()}>
        <input type="text"
               autoComplete="off"
               value={this.state.query}
               placeholder="Search for tracks ..."
               onChange={(e) => this.onQueryChange.bind(this, e.target.value)()}>
        </input>
        <MatButtonComponent buttonClassName={'search-btn'}
                   icon={'search'}
                   bgColor={blue_darken_1}
                   bgColorHover={blue}
                   isSubmit={true}>
        </MatButtonComponent>
      </form>
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
