import React from 'react';

const NUM_COLUMNS = 3;

const GalleryComponent = ({entities, component}) => {
  return (
    <div className='om-gallery'>
      {getItems({entities, component})}
    </div>
  );
};

const getItems = ({entities, component}) => {
  return entities.map((entity) => (
    <div className="item"
         key={entity['mbid']}
         style={{flex: `0 0 ${100 / NUM_COLUMNS}%`}}>
      {component(entity)}
    </div>
  ));
};

export default GalleryComponent;
