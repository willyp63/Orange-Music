import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty } from '../../../util/empty';
import { addTrackToQueue, playTrack } from '../../../actions/queue_actions';

import FlexGalleryComponent from '../../shared/flex_gallery/flex_gallery';
import MatSpinnerComponent from '../../shared/mat_spinner/mat_spinner';
import TopTrackGalleryItemComponent from './item';

const TopTracksGalleryComponent = ({tracks, playTrack, addTrackToQueue}) => {
  const actions = { playTrack, addTrackToQueue };
  return isNotEmpty(tracks)
    ? (
      <FlexGalleryComponent galleryClassName='top-tracks-gallery'
                            objs={tracks}
                            keyPath={'mbid'}
                            component={TopTrackGalleryItemComponent}
                            actions={actions}>
      </FlexGalleryComponent>
    ) : (
      <div className='top-tracks-gallery'>
        <MatSpinnerComponent />
      </div>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.home.topTracks.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playTrack: (track) => {
      dispatch(playTrack(track));
    },
    addTrackToQueue: (track) => {
      dispatch(addTrackToQueue(track));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopTracksGalleryComponent);
