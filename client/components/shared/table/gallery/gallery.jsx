import React from 'react';
import { connect } from 'react-redux';
import GalleryTile from './gallery_tile';
import { play, addToQueue, removeFromQueue, removeFromHistory } from '../../../../store/modules/queue';

const NUM_COLUMNS = 3;

const Gallery = ({entities, schema, play, addToQueue, removeFromQueue,
    removeFromHistory}) => {

  const actions = {play, addToQueue, removeFromQueue, removeFromHistory};

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
    play: (track) => {
      dispatch(play(track));
    },
    addToQueue: (track) => {
      dispatch(addToQueue(track));
    },
    removeFromQueue: (track) => {
      dispatch(removeFromQueue(track));
    },
    removeFromHistory: (track) => {
      dispatch(removeFromHistory(track));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
