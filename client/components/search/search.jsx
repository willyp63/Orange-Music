import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { isNotEmpty, isEmpty } from '../../util/empty';
import { equalIgnoreCase, notEqualIgnoreCase } from '../../util/string';
import { getUrlWithUpdatedParams, getUrlParams } from '../../util/url';
import { searchTracks, searchArtists, clearTracks, clearArtists } from '../../actions/search_actions';
import SearchFormComponent from './search_form/search_form';
import SEARCH_TABLE_SCHEMAS, { SEARCH_TABLE_TYPES } from './search_table_schemas';
import TableLayoutComponent from '../shared/table_layout/table_layout';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props)
    const { query, trackResults, artistResults } = props;
    this.state = {query};
    if (notEqualIgnoreCase(trackResults.query, query)) { props.clearTracks(); }
    if (notEqualIgnoreCase(artistResults.query, query)) { props.clearArtists(); }
  }
  componentDidMount() {
    const $input = $(ReactDOM.findDOMNode(this)).find('.search-form .mat-input input');
    $input.focus();
    // We do the following so that focus ends up at the end of the input, not the beginning.
    const inputVal = $input.val();
    $input.val('');
    $input.val(inputVal);
  }
  componentWillReceiveProps(newProps) {
    if (equalIgnoreCase(newProps.query, this.state.query)) { return; }
    this.setState({query: newProps.query});
    this.props.clearTracks();
    this.props.clearArtists();
  }
  onQueryChange(query) {
    if (equalIgnoreCase(query, this.state.query)) { return; }
    this.setState({query});
    this.props.clearTracks();
    this.props.clearArtists();
    this.updateUrl.bind(this)(query);
  }
  updateUrl(query) {
    const { pathname, search } = this.props.location;
    const currentUrl = pathname + search;
    const newUrl = getUrlWithUpdatedParams(currentUrl, {q: query});
    if (currentUrl !== newUrl) { this.props.history.push(newUrl); }
  }
  render() {
    const { trackResults, artistResults, searchTracks, searchArtists } = this.props;
    const { query } = this.state;

    const tableSchemas = Object.assign({}, SEARCH_TABLE_SCHEMAS);

    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].entities = trackResults.tracks;
    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].emptyTable = (
      <div className='empty-table'>No results</div>
    );
    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].isFetching = trackResults.isFetching;
    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].endOfTable = trackResults.endOfTable;
    tableSchemas[SEARCH_TABLE_TYPES.TRACKS].fetcher = isNotEmpty(query)
      ? searchTracks.bind(null, query)
      : () => {};

    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].entities = artistResults.artists;
    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].emptyTable = (
      <div className='empty-table'>No results</div>
    );
    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].isFetching = artistResults.isFetching;
    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].endOfTable = artistResults.endOfTable;
    tableSchemas[SEARCH_TABLE_TYPES.ARTISTS].fetcher = isNotEmpty(query)
      ? searchArtists.bind(null, query)
      : () => {};

    return (
      <div className="search">
        <TableLayoutComponent tableSchemas={tableSchemas}>
          <SearchFormComponent query={query} onQuery={this.onQueryChange.bind(this)} />
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
