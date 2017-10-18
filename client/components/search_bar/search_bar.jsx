import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import lastFmApi from '../../api/last_fm/last_fm_api';

import { searchTracks } from '../../actions/search_actions';

import { getUrlWithUpdatedParams, getUrlParams } from '../../util/url';
import { isNotEmpty } from '../../util/empty';

class SearchBarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.query,
      page: props.page,
      pageSize: props.pageSize
    };
  }
  onQuery(e) {
    e.preventDefault();
    this.props.makeQuery({
      query: this.state.query,
      page: this.state.page,
      pageSize: this.state.pageSize
    });
    this.updateUrl.bind(this)();
  }
  onQueryChange(newQuery) {
    this.setState((oldState) => Object.assign(oldState, {query: newQuery}));
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
      <div className="search-bar">
        <img src="/static/images/logo.png"
             className="orange-image" />
           <form className="search-form"
              onSubmit={(e) => this.onQuery.bind(this, e)()}>
          <div className="orange-music-label">Orange Music</div>
          <div className="query-input">
            <input type="text"
                   autoComplete="off"
                   value={this.state.query}
                   onChange={(e) => this.onQueryChange.bind(this, e.target.value)()}>
            </input>
            <button type="submit">
              <span className="glyphicon glyphicon-search"></span>
            </button>
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
)(SearchBarComponent));
