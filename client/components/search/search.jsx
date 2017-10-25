import React from 'react';
import { connect } from 'react-redux';
import SearchFormComponent from './search_form/search_form';
import TRACK_LIST_SCHEMA from '../shared/table/list/schemas/track_list_schema';
import ARTIST_LIST_SCHEMA from '../shared/table/list/schemas/artist_list_schema';
import TRACK_GALLERY_SCHEMA from '../shared/table/gallery/schemas/track_gallery_schema';
import ARTIST_GALLERY_SCHEMA from '../shared/table/gallery/schemas/artist_gallery_schema';
import TableLayoutComponent from '../shared/table_layout/table_layout';


const TABLE_TYPES = Object.freeze({
  TRACKS: 0,
  ARTISTS: 1,
});

let TABLES1 = {};
TABLES1[TABLE_TYPES.TRACKS] = {
  label: 'Tracks',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
};
TABLES1[TABLE_TYPES.ARTISTS] = {
  label: 'Artists',
  listSchema: ARTIST_LIST_SCHEMA,
  gallerySchema: ARTIST_GALLERY_SCHEMA,
};
const TABLES = Object.freeze(TABLES1);


class SearchComponent extends React.Component {
  componentDidMount() {
    // Focus input when you first visit route.
    $('.search .search-form-container input').focus();
  }
  render() {
    const { tracks, isFetching } = this.props;

    const tables = Object.assign({}, TABLES);
    tables[TABLE_TYPES.TRACKS].entities = tracks;
    tables[TABLE_TYPES.ARTISTS].entities = []; // TODO

    return (
      <div className="search">
        <TableLayoutComponent tables={tables}>
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
    isFetching: state.search.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
