import React from 'react';
import { connect } from 'react-redux';
import FlexTableComponent from './flex_table/flex_table';
import { playTrack, addTrackToQueue, removeTrackFromQueue,
  removeTrackFromHistory } from '../../../../actions/queue_actions';

const ListComponent = ({entities, schema, playTrack, addTrackToQueue,
    removeTrackFromQueue, removeTrackFromHistory}) => {

  const actions = {playTrack, addTrackToQueue, removeTrackFromQueue,
    removeTrackFromHistory};

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
    removeTrackFromHistory: (track) => {
      dispatch(removeTrackFromHistory(track));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
