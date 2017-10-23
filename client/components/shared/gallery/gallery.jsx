import React from 'react';

import FlexGalleryComponent from '../../material/flex_gallery/flex_gallery';

const GalleryComponent = ({entities, component}) => {
  return (
    <FlexGalleryComponent galleryClassName={'om-gallery'}
                          objs={entities}
                          keyPath={'mbid'}
                          maxColumns={3}
                          component={component} />
  )
};

export default GalleryComponent;
