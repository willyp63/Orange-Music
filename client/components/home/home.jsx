import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { fetchTracks } from '../../actions/home_actions';

import TopTracksGalleryComponent from './top_tracks_gallery/top_tracks_gallery';

const BOX_SHADOW_STYLE = Object.freeze({
  'border-bottom': '1px solid rgba(0, 0, 0, 0)',
  'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
});

const BORDER_STYLE = Object.freeze({
  'border-bottom': '1px solid #e0e0e0',
  'box-shadow': 'none'
});

class HomeComponent extends React.Component {
  componentDidMount() {
    this.scrollHandler = this.updateNavBarStyle.bind(this);
    $(document).scroll(this.scrollHandler);
    this.scrollHandler();

    this.props.fetchTracks();
  }
  componentWillUnmount() {
    $(document).off('scroll', this.scrollHandler);
  }
  updateNavBarStyle() {
    const style = $(window).scrollTop() !== 0
      ? BOX_SHADOW_STYLE
      : BORDER_STYLE;
    $(ReactDOM.findDOMNode(this))
      .find('.nav-bar')
      .css(style);
  }
  render() {
    return (
      <div className="home">
        <div className="nav-bar">
          <div className="title-container">
            <div className="title">
              <img src='/static/images/logo.png' />
              <span>Orange Music</span>
            </div>
          </div>
          <div className="top-tracks-label">
            Top Tracks
          </div>
        </div>
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
    fetchTracks: () => { dispatch(fetchTracks()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
