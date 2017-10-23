import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { fetchTopTracks, fetchTopArtists } from '../../actions/home_actions';

import TabsComponent from '../shared/tabs/tabs';
import MatNavBarComponent from '../material/mat_nav_bar/mat_nav_bar';
import TopTracksGalleryComponent from './top_tracks_gallery/top_tracks_gallery';
import OrangeMusicTitleComponent from './title/title';
import TableTypePickerComponent from '../shared/table_type_picker/table_type_picker';

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
    this.state = {table: TABLE_VALUES.TOP_TRACKS};
  }
  componentDidMount() {
    this.props.fetchTopTracks();
    this.props.fetchTopArtists();
  }
  render() {
    return (
      <div className="home">
        <MatNavBarComponent>
          <div className="title-container">
            <OrangeMusicTitleComponent />
          </div>
          <div className="table-options-bar">
            <TabsComponent tabs={TABS} />
            <TableTypePickerComponent />
          </div>
        </MatNavBarComponent>
        <div className="top-tracks-table-container">
          <TopTracksGalleryComponent />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
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
