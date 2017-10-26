import React from 'react';
import { connect } from 'react-redux';
import SearchFormComponent from './search_form/search_form';
import SEARCH_TABLE_SCHEMA, { SEARCH_TABLE_TYPES } from './search_table_schema';
import TableLayoutComponent from '../shared/table_layout/table_layout';

class SearchComponent extends React.Component {
  componentDidMount() {
    // Focus input when you first visit route.
    $('.search .search-form-container input').focus();
  }
  render() {
    const { tracks, artists } = this.props;

    const tableSchema = Object.assign({}, SEARCH_TABLE_SCHEMA);
    tableSchema[SEARCH_TABLE_TYPES.TRACKS].entities = tracks;
    tableSchema[SEARCH_TABLE_TYPES.ARTISTS].entities = artists;

    return (
      <div className="search">
        <TableLayoutComponent tableSchema={tableSchema}>
          <div className="search-form-container">
            <SearchFormComponent />
          </div>
        </TableLayoutComponent>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.search.tracks,
    artists: state.search.artists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
