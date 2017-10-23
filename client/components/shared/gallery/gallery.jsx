import React from 'react';
import FlexGalleryComponent from '../flex_gallery/flex_gallery';

const GalleryComponent = ({entities, component}) => {
  return (
    <FlexGalleryComponent className={'om-gallery'}
                          objs={entities}
                          keyPath={'mbid'}
                          maxColumns={3}
                          component={component} />
  )
};

export default GalleryComponent;
