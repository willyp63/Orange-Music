import React from 'react';
import { connect } from 'react-redux';
import GalleryTile from './gallery_tile';
import { playTrack, addTrackToQueue, removeTrackFromQueue } from '../../../../actions/queue_actions';

const NUM_COLUMNS = 3;

const GalleryComponent = ({entities, schema, playTrack, addTrackToQueue,
    removeTrackFromQueue}) => {

  const actions = {playTrack, addTrackToQueue, removeTrackFromQueue};

  return (
    <div className='om-gallery'>
      {getItems({entities, schema, actions})}
    </div>
  );
};

const getItems = ({entities, schema, actions}) => {
  return entities.map((entity) => (
    <div className='gallery-item'
         key={entity['mbid']}
         style={{flex: `0 0 ${100 / NUM_COLUMNS}%`}}>
      <GalleryTile entity={entity} schema={schema} actions={actions} />
    </div>
  ));
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
)(GalleryComponent);
