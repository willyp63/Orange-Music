import React from 'react';
import { connect } from 'react-redux';

import { fetchTracks } from '../../actions/home_actions';

import TopTracksTableComponent from './top_tracks_table/top_tracks_table';

class HomeComponent extends React.Component {
  componentDidMount() {
    this.props.fetchTracks();
  }
  render() {
    return (
      <div className="home">
        <div className="title-container">
          <div className="title">
            <img src='/static/images/logo.png' />
            <span>Orange Music</span>
          </div>
        </div>
        <div className="top-tracks-label">
          Top Tracks
        </div>
        <div className="top-tracks-table-container">
          <TopTracksTableComponent />
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
    fetchTracks: () => { dispatch(fetchTracks()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
