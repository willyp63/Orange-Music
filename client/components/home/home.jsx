import React from 'react';
import { connect } from 'react-redux';
import { fetchTopTracks, fetchTopArtists } from '../../actions/home_actions';
import OrangeMusicTitleComponent from './title/title';
import TRACKS_LIST_SCHEMA from '../shared/list/schemas/tracks_schema';
import ARTIST_LIST_SCHEMA from '../shared/list/schemas/artists_schema';
import TrackGalleryComponent from '../shared/gallery/components/track_component';
import ArtistGalleryComponent from '../shared/gallery/components/artist_component';
import TableLayoutComponent from '../shared/table_layout/table_layout';

const TABLE_TYPES = Object.freeze({
  TOP_TRACKS: 0,
  TOP_ARTISTS: 1,
});

let TABLES1 = {};
TABLES1[TABLE_TYPES.TOP_TRACKS] = {
  label: 'Top Tracks',
  listSchema: TRACKS_LIST_SCHEMA,
  galleryComponent: TrackGalleryComponent,
};
TABLES1[TABLE_TYPES.TOP_ARTISTS] = {
  label: 'Top Artists',
  listSchema: ARTIST_LIST_SCHEMA,
  galleryComponent: ArtistGalleryComponent,
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
            <OrangeMusicTitleComponent />
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
