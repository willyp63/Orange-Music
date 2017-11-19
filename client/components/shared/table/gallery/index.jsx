import React from 'react';
import Tile from './tile';
import ActionProvider from '../shared/action_provider';

const Gallery = ({ entities, schema, actions }) => {
  const $items = entities.map((entity) => (
    <div className='gallery-item' key={entity.mbid || entity.id}>
      <Tile entity={entity} schema={schema} actions={actions} />
    </div>
  ));

  return (<div className='om-gallery'>{$items}</div>);
};

const GalleryWithActions = (props) => (
  <ActionProvider>
    <Gallery {...props} />
  </ActionProvider>
);

export default GalleryWithActions;
