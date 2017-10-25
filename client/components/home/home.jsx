import React from 'react';
import { connect } from 'react-redux';
import { fetchTopTracks, fetchTopArtists } from '../../actions/home_actions';
import TRACK_LIST_SCHEMA from '../shared/table/list/schemas/track_list_schema';
import ARTIST_LIST_SCHEMA from '../shared/table/list/schemas/artist_list_schema';
import TRACK_GALLERY_SCHEMA from '../shared/table/gallery/schemas/track_gallery_schema';
import ARTIST_GALLERY_SCHEMA from '../shared/table/gallery/schemas/artist_gallery_schema';
import TableLayoutComponent from '../shared/table_layout/table_layout';


const TABLE_TYPES = Object.freeze({
  TOP_TRACKS: 0,
  TOP_ARTISTS: 1,
});

let TABLES1 = {};
TABLES1[TABLE_TYPES.TOP_TRACKS] = {
  label: 'Top Tracks',
  listSchema: TRACK_LIST_SCHEMA,
  gallerySchema: TRACK_GALLERY_SCHEMA,
};
TABLES1[TABLE_TYPES.TOP_ARTISTS] = {
  label: 'Top Artists',
  listSchema: ARTIST_LIST_SCHEMA,
  gallerySchema: ARTIST_GALLERY_SCHEMA,
};
const TABLES = Object.freeze(TABLES1);


class HomeComponent extends React.Component {
  componentDidMount() {
    this.props.fetchTopTracks();
    this.props.fetchTopArtists();
  }
  render() {
    const { topTracks, topArtists } = this.props;

    const tables = Object.assign({}, TABLES);
    tables[TABLE_TYPES.TOP_TRACKS].entities = topTracks;
    tables[TABLE_TYPES.TOP_ARTISTS].entities = topArtists;

    return (
      <div className="home">
        <TableLayoutComponent tables={tables}>
          <div className="title-container">
            <span>Orange Music</span>
          </div>
        </TableLayoutComponent>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    topTracks: state.home.topTracks.tracks,
    topArtists: state.home.topArtists.artists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopTracks: () => { dispatch(fetchTopTracks()); },
    fetchTopArtists: () => { dispatch(fetchTopArtists()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
