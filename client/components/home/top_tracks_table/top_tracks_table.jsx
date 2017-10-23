import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty } from '../../../util/empty';

import { removeTrackFromQueue } from '../../../actions/queue_actions';

import FlexTableComponent from '../../material/flex_table/flex_table';

import TABLE_SCHEMA from './top_tracks_schema';

const TopTracksTableComponent = ({tracks}) => {
  return isNotEmpty(tracks)
    ? (
      <FlexTableComponent rowObjs={tracks}
                          keyPath={'mbid'}
                          schema={TABLE_SCHEMA}>
      </FlexTableComponent>
    ) : (
      <div className='empty-state'>
        No tracks ...
      </div>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.home.topTracks.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopTracksTableComponent);
