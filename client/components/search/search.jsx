import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isNotEmpty, isEmpty } from '../../util/empty';
import { getUrlWithUpdatedParams, getUrlParams } from '../../util/url';
import { searchTracks, searchArtists, clearTracks, clearArtists } from '../../actions/search_actions';
import SearchFormComponent from './search_form/search_form';
import SEARCH_TABLE_SCHEMAS, { SEARCH_TABLE_TYPES } from './search_table_schemas';
import TableLayoutComponent from '../shared/table_layout/table_layout';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {query: props.query};
  }
  componentDidMount() {
    // Focus input when you first visit route.
    $('.search .search-form-container input').focus();
  }
  onQueryChange(query) {
    if (query === this.state.query) { return; }
    this.props.clearTracks();
    this.props.clearArtists();
    this.setState({query});
  }
  updateUrl() {
    const { pathname, search } = this.props.location;
    const currentUrl = pathname + search;
    const newUrl = getUrlWithUpdatedParams(pathname, {q: this.state.query});
    if (currentUrl !== newUrl) { this.props.history.push(newUrl); }
  }
  render() {
    const { trackResults, artistResults, searchTracks, searchArtists } = this.props;
    const { query } = this.state;

    const tableSchemas = Object.assign({}, SEARCH_TABLE_SCHEMAS);

    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].entities = trackResults.tracks;
    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].isFetching = trackResults.isFetching;
    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].endOfTable = trackResults.endOfTable;
    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].fetcher = isNotEmpty(query)
      ? searchTracks.bind(null, query)
      : () => {};

    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].entities = artistResults.artists;
    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].isFetching = artistResults.isFetching;
    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].endOfTable = artistResults.endOfTable;
    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].fetcher = isNotEmpty(query)
      ? searchArtists.bind(null, query)
      : () => {};

    return (
      <div className="search">
        <TableLayoutComponent tableSchemas={tableSchemas}>
          <div className="search-form-container">
            <SearchFormComponent query={query} onQuery={this.onQueryChange.bind(this)} />
          </div>
        </TableLayoutComponent>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const urlParams = getUrlParams(ownProps.location.search);
  const query = isNotEmpty(urlParams.q)
    ? decodeURIComponent(urlParams.q)
    : '';
  return {
    query,
    trackResults: state.search.trackResults,
    artistResults: state.search.artistResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchTracks: (query, queryParams) => {
      dispatch(searchTracks(query, queryParams));
    },
    searchArtists: (query, queryParams) => {
      dispatch(searchArtists(query, queryParams));
    },
    clearTracks: () => {
      dispatch(clearTracks());
    },
    clearArtists: () => {
      dispatch(clearArtists());
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent));
