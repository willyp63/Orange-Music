import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { fetchTopTracks, fetchTopArtists } from '../../actions/home_actions';
import { isNotEmpty } from '../../util/empty';

import TabsComponent from '../shared/tabs/tabs';
import MatNavBarComponent, { BORDER_STYLE } from '../material/mat_nav_bar/mat_nav_bar';
import OrangeMusicTitleComponent from './title/title';
import TableTypePickerComponent, { TABLE_TYPES } from '../shared/table_type_picker/table_type_picker';

import ListComponent from '../shared/list/list';
import ListHeaderComponent from '../shared/list/list_header';
import TRACKS_LIST_SCHEMA from '../shared/list/schemas/tracks_schema';
import ARTIST_LIST_SCHEMA from '../shared/list/schemas/artists_schema';

import GalleryComponent from '../shared/gallery/gallery';
import TrackGalleryComponent from '../shared/gallery/components/track_component';
import ArtistGalleryComponent from '../shared/gallery/components/artist_component';

const TABLE_VALUES = Object.freeze({
  TOP_TRACKS: 0,
  TOP_ARTISTS: 1,
});

const TABS = [
  {
    label: 'Top Tracks',
    value: TABLE_VALUES.TOP_TRACKS,
  },
  {
    label: 'Top Artists',
    value: TABLE_VALUES.TOP_ARTISTS,
  },
];

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableValue: TABLE_VALUES.TOP_TRACKS,
      tableType: TABLE_TYPES.GALLERY,
    };
  }
  componentDidMount() {
    this.props.fetchTopTracks();
    this.props.fetchTopArtists();
  }
  onTableValueChange(tableValue) {
    if (this.state.tableValue === tableValue) { return; }
    this.setState({tableValue});
  }
  onTableTypeChange(tableType) {
    if (this.state.tableType === tableType) { return; }
    this.setState({tableType});
  }
  render() {
    const { topTracks, topArtist } = this.props;
    const { tableValue, tableType } = this.state;

    let $table;
    if (tableType === TABLE_TYPES.GALLERY) {
      $table = tableValue === TABLE_VALUES.TOP_TRACKS
        ? (
          <GalleryComponent entities={topTracks}
                            component={TrackGalleryComponent} />
        ) : (
          <GalleryComponent entities={topArtist}
                            component={ArtistGalleryComponent} />
        );
    } else {
      $table = tableValue === TABLE_VALUES.TOP_TRACKS
        ? (
          <ListComponent entities={topTracks}
                         schema={TRACKS_LIST_SCHEMA} />
        ) : (
          <ListComponent entities={topArtist}
                         schema={ARTIST_LIST_SCHEMA} />
        );
    }

    let $listHeader = '';
    if (tableType === TABLE_TYPES.LIST) {
      $listHeader = tableValue === TABLE_VALUES.TOP_TRACKS
        ? (<ListHeaderComponent schema={TRACKS_LIST_SCHEMA} />)
        : (<ListHeaderComponent schema={ARTIST_LIST_SCHEMA} />);
    }

    return (
      <div className="home">
        <MatNavBarComponent>
          <div className="title-container">
            <OrangeMusicTitleComponent />
          </div>
          <div className="table-options-bar"
               style={isNotEmpty($listHeader)
                        ? {borderBottom: '1px solid #e0e0e0'}
                        : {}}>
            <TabsComponent tabs={TABS}
                           onTabChange={this.onTableValueChange.bind(this)} />
            <TableTypePickerComponent onTableTypeChange={this.onTableTypeChange.bind(this)}/>
          </div>
          <div className="list-header-container">
            {$listHeader}
          </div>
        </MatNavBarComponent>
        <div className="table-container">
          {$table}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    topTracks: state.home.topTracks.tracks,
    topArtist: state.home.topArtists.artists,
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
