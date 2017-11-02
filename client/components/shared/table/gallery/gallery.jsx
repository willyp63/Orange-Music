import React from 'react';
import GalleryTile from './gallery_tile';
import ActionProvider from '../shared/action_provider';

const NUM_COLUMNS = 3;

const Gallery = ({ entities, schema, actions }) => {
  const $items = entities.map((entity) => (
    <div className='gallery-item'
         key={entity.mbid}
         style={{flex: `0 0 ${100 / NUM_COLUMNS}%`}}>
      <GalleryTile entity={entity} schema={schema} actions={actions} />
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
