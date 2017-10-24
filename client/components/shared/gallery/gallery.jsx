import React from 'react';
import FlexGalleryComponent from '../flex_gallery/flex_gallery';

const GalleryComponent = ({entities, component}) => {
  return (
    <FlexGalleryComponent className={'om-gallery'}
                          objs={entities}
                          keyPath={'mbid'}
                          component={component} />
  )
};

export default GalleryComponent;
