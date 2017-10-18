import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import lastFmApi from '../../api/last_fm/last_fm_api';

import { searchTracks } from '../../actions/search_actions';

import { getUrlWithUpdatedParams, getUrlParams } from '../../util/url';
import { isNotEmpty } from '../../util/empty';

const EMPTY_IMG_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICA'
    + 'MAAACahl6sAAAABlBMVEX///8AAABVwtN+AAAA5ElEQVR4nO3PAQ0AMBADoZ9/07NBmsMB90'
    + 'bcuwlFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0S5ERH83EAx0VzRQTAAAAAE'
    + 'lFTkSuQmCC';

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
        <img src={EMPTY_IMG_SRC}
             className="orange-image" />
           <form className="search-form"
              onSubmit={(e) => this.onQuery.bind(this, e)()}>
          <div className="orange-music-label">Orange Music</div>
          <input type="text"
                 className="query-input"
                 autoComplete="off"
                 value={this.state.query}
                 onChange={(e) => this.onQueryChange.bind(this, e.target.value)()} />
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
