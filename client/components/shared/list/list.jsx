import React from 'react';
import { connect } from 'react-redux';
import { playTrack, addTrackToQueue, removeTrackFromQueue } from '../../../actions/queue_actions';
import FlexTableComponent from '../flex_table/flex_table';

const ListComponent = ({entities, schema, playTrack, addTrackToQueue,
    removeTrackFromQueue}) => {

  const actions = {playTrack, addTrackToQueue, removeTrackFromQueue};

  return (
    <FlexTableComponent className={'om-list'}
                        rowObjs={entities}
                        keyPath={'mbid'}
                        schema={schema}
                        actions={actions} />
  )
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    playTrack: (track) => {
      dispatch(playTrack(track));
    },
    addTrackToQueue: (track) => {
      dispatch(addTrackToQueue(track));
    },
    removeTrackFromQueue: (track) => {
      dispatch(removeTrackFromQueue(track));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);