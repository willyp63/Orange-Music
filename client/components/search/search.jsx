import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TABLE_SCHEMA, { SEARCH_TABLE_TYPES } from '../../schemas/table_layout/search';
import TableLayoutComponent from '../shared/table_layout';
import { measureText, FONT_TYPES, GRID } from '../material/index';
import TextField from 'material-ui/TextField';
import { fetchEntities, fetchMoreEntities, setQuery, setSearchDisplayType,
  setSearchTableType } from '../../store/modules/search';

const DEFAULT_MAT_INPUT_WIDTH = GRID * 60;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this._focusInput = this._focusInput.bind(this);
    this._updateInputWidth = this._updateInputWidth.bind(this);
    this._getSearchForm = this._getSearchForm.bind(this);
    this._getMart = this._getMatInput.bind(this);
    this._getInput = this._getInput.bind(this);

    props.fetchEntities();
  }
  componentDidMount() {
    this._focusInput();
    this._updateInputWidth();
  }
  componentDidUpdate() {
    this._updateInputWidth();
  }
  _focusInput() {
    const $input = this._getInput();
    $input.focus();

    // So that focus ends up at the end of the input, not the beginning.
    const temp = $input.val();
    $input.val('');
    $input.val(temp);
  }
  /// Resize input to fit query.
  _updateInputWidth() {
    const $searchForm = this._getSearchForm();
    const $matInput = this._getMatInput();

    const queryWidth = measureText(this.props.query, FONT_TYPES.DISPLAY_1);

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
  _getSearchForm() {
    return $(ReactDOM.findDOMNode(this)).find('.search-form');
  }
  _getMatInput() {
    return this._getSearchForm().find('.search-field');
  }
  _getInput() {
    return this._getMatInput().find('input');
  }
  render() {
    const { tracks, artists, query, setQuery, tableType, displayType,
      setDisplayType, setTableType, fetchMoreEntities } = this.props;

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

    return (
      <div className="search">
        <TableLayoutComponent schema={schema}
                              tableType={tableType}
                              onTableTypeChange={setTableType}
                              displayType={displayType}
                              onDisplayTypeChange={setDisplayType}
                              onScrollBottom={fetchMoreEntities}>
          <div className="search-form">
            <TextField className='search-field'
                       value={query}
                       placeholder="Start typing..."
                       onChange={e => setQuery(e.target.value)} />
          </div>
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
    fetchEntities: (startIdx) => { dispatch(fetchEntities(startIdx)); },
    fetchMoreEntities: (startIdx) => { dispatch(fetchMoreEntities(startIdx)); },
    setQuery: (query) => { dispatch(setQuery(query)); },
    setTableType: (tableType) => { dispatch(setSearchTableType(tableType)); },
    setDisplayType: (displayType) => { dispatch(setSearchDisplayType(displayType)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
