import React from 'react';
import { connect } from 'react-redux';
import SearchFormComponent from './search_form/search_form';
import TRACKS_LIST_SCHEMA from '../shared/list/schemas/tracks_schema';
import ARTIST_LIST_SCHEMA from '../shared/list/schemas/artists_schema';
import TrackGalleryComponent from '../shared/gallery/components/track_component';
import ArtistGalleryComponent from '../shared/gallery/components/artist_component';
import TableLayoutComponent from '../shared/table_layout/table_layout';

const TABLE_TYPES = Object.freeze({
  TRACKS: 0,
  ARTISTS: 1,
});

let TABLES1 = {};
TABLES1[TABLE_TYPES.TRACKS] = {
  label: 'Tracks',
  listSchema: TRACKS_LIST_SCHEMA,
  galleryComponent: TrackGalleryComponent,
};
TABLES1[TABLE_TYPES.ARTISTS] = {
  label: 'Artists',
  listSchema: ARTIST_LIST_SCHEMA,
  galleryComponent: ArtistGalleryComponent,
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
