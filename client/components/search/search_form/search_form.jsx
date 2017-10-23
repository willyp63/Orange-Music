import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isNotEmpty, isEmpty } from '../../../util/empty';
import { getUrlWithUpdatedParams, getUrlParams } from '../../../util/url';
import lastFmApi from '../../../api/last_fm/last_fm_api';
import { searchTracks } from '../../../actions/search_actions';
import { MatButton } from '../../material/index';

class SearchFormComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {query: props.query};

    // Incase url contains query.
    this.makeQuery.bind(this)();
  }
  onQueryChange(query) {
    this.setState({query});
  }
  onQuery(e) {
    e.preventDefault();
    this.makeQuery.bind(this)();
    this.updateUrl.bind(this)();
  }
  makeQuery() {
    const { query, page, pageSize } = this.state;

    if (isEmpty(query) || query === this.lastQuery) { return; }

    this.props.makeQuery(query);
    this.lastQuery = query;
  }
  updateUrl() {
    const { pathname, search } = this.props.location;
    const currentUrl = pathname + search;
    const newUrl = getUrlWithUpdatedParams(pathname, {q: this.state.query});
    if (currentUrl !== newUrl) { this.props.history.push(newUrl); }
  }
  render() {
    return (
      <form className="search-form"
            onSubmit={this.onQuery.bind(this)}>
        <input type="text"
               autoComplete="off"
               value={this.state.query}
               placeholder="Search..."
               onChange={(e) => {
                 this.onQueryChange.bind(this, e.target.value)();
               }}>
        </input>
        <MatButton icon={'search'}
                   isRaised={true}
                   isSubmit={true} />
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const urlParams = getUrlParams(ownProps.location.search);
  const query = isNotEmpty(urlParams.q)
    ? decodeURIComponent(urlParams.q)
    : '';
  return {query};
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeQuery: (query) => {
      dispatch(searchTracks(query));
    }
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormComponent));
