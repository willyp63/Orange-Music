import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty } from '../../../util/empty';

import { removeTrackFromQueue } from '../../../actions/queue_actions';

import FlexTableComponent from '../../material/flex_table/flex_table';

import TABLE_SCHEMA from '../queue_schema';

const QueueTableComponent = ({tracks, removeTrackFromQueue}) => {
  const actions = {removeTrackFromQueue};
  return isNotEmpty(tracks.slice(1))
    ? (
      <FlexTableComponent rowObjs={tracks.slice(1)}
                          keyPath={'mbid'}
                          schema={TABLE_SCHEMA}
                          actions={actions}>
      </FlexTableComponent>
    ) : (
      <div className='empty-state'>
        No tracks in queue ...
      </div>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.queue.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTrackFromQueue: (track) => {
      dispatch(removeTrackFromQueue(track));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueueTableComponent);
