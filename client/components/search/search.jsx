import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TABLE_SCHEMA, { SEARCH_TABLE_TYPES } from '../../schemas/table/search';
import TableLayoutComponent from '../shared/table_layout/table_layout';
import { MatInput, measureText, FONT_TYPES, GRID } from '../material/index';
import { fetchTracks, fetchArtists, fetchMoreTracks, fetchMoreArtists, setQuery,
  setSearchDisplayType, setSearchTableType, clearTracks, clearArtists } from '../../store/modules/search';

const DEFAULT_MAT_INPUT_WIDTH = GRID * 60;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this._focusInput = this._focusInput.bind(this);
    this._fetch = this._fetch.bind(this);
    this._fetchMore = this._fetchMore.bind(this);
    this._updateInputWidth = this._updateInputWidth.bind(this);

    if (props.query.length > 0) { this._fetch(); }
  }
  componentDidMount() {
    this._focusInput();
    this._updateInputWidth();
  }
  componentDidUpdate() {
    this._updateInputWidth();
  }
  _focusInput() {
    const $input = $(ReactDOM.findDOMNode(this)).find('.search-form .mat-input input');
    $input.focus();

    // So that focus ends up at the end of the input, not the beginning.
    const inputVal = $input.val();
    $input.val('');
    $input.val(inputVal);
  }
  _updateInputWidth() {
    // Resize input to fit query.
    const queryWidth = measureText(this.props.query, FONT_TYPES.DISPLAY_1);
    const $searchForm = $(ReactDOM.findDOMNode(this)).find('.search-form');
    const $matInput = $searchForm.find('.mat-input');
    if (queryWidth > DEFAULT_MAT_INPUT_WIDTH) {
      const searchFormWidth = $searchForm.width();
      if (queryWidth < searchFormWidth) {
        $matInput.width(queryWidth);
      } else {
        $matInput.width(searchFormWidth);
      }
    } else {
      $matInput.width(DEFAULT_MAT_INPUT_WIDTH);
    }
  }
  _fetch() {
    const { fetchTracks, fetchArtists, tableType } = this.props;
    if (tableType === SEARCH_TABLE_TYPES.TRACKS) {
      fetchTracks();
    } else if (tableType === SEARCH_TABLE_TYPES.ARTISTS) {
      fetchArtists();
    }
  }
  _fetchMore() {
    const { fetchMoreTracks, fetchMoreArtists, tableType } = this.props;
    if (tableType === SEARCH_TABLE_TYPES.TRACKS) {
      fetchMoreTracks();
    } else if (tableType === SEARCH_TABLE_TYPES.ARTISTS) {
      fetchMoreArtists();
    }
  }
  render() {
    const { tracks, artists, query, setQuery, tableType, displayType,
      setDisplayType, setTableType } = this.props;

    const schema = Object.assign({}, TABLE_SCHEMA);

    const $emptyTable = (<div className='empty-table'>No results</div>);

    schema[SEARCH_TABLE_TYPES.TRACKS].entities = tracks.tracks;
    schema[SEARCH_TABLE_TYPES.TRACKS].isFetching = tracks.isFetching;
    schema[SEARCH_TABLE_TYPES.TRACKS].endOfTable = tracks.endOfTable;
    schema[SEARCH_TABLE_TYPES.TRACKS].emptyTable = $emptyTable;

    schema[SEARCH_TABLE_TYPES.ARTISTS].entities = artists.artists;
    schema[SEARCH_TABLE_TYPES.ARTISTS].isFetching = artists.isFetching;
    schema[SEARCH_TABLE_TYPES.ARTISTS].endOfTable = artists.endOfTable;
    schema[SEARCH_TABLE_TYPES.ARTISTS].emptyTable = $emptyTable;

    const onSubmit = (e) => {
      e.preventDefault();
      this._fetch();
    };

    return (
      <div className="search">
        <TableLayoutComponent schema={schema}
                              tableType={tableType}
                              onTableTypeChange={setTableType}
                              displayType={displayType}
                              onDisplayTypeChange={setDisplayType}
                              onScrollBottom={this._fetchMore}>
          <form className="search-form" onSubmit={onSubmit}>
            <MatInput value={query}
                      placeholder="Search for tracks or artists"
                      onValueChange={setQuery} />
          </form>
        </TableLayoutComponent>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    query: state.search.query,
    tracks: state.search.tracks,
    artists: state.search.artists,
    tableType: state.search.tableType,
    displayType: state.search.displayType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTracks: (startIdx) => { dispatch(fetchTracks(startIdx)); },
    fetchArtists: (startIdx) => { dispatch(fetchArtists(startIdx)); },
    fetchMoreTracks: (startIdx) => { dispatch(fetchMoreTracks(startIdx)); },
    fetchMoreArtists: (startIdx) => { dispatch(fetchMoreArtists(startIdx)); },
    setQuery: (query) => { dispatch(setQuery(query)); },
    setTableType: (tableType) => { dispatch(setSearchTableType(tableType)); },
    setDisplayType: (displayType) => { dispatch(setSearchDisplayType(displayType)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
