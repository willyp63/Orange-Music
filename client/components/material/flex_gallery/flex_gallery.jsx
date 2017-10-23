import React from 'react';

import { isNotEmpty, coalesce} from '../../../util/empty';

const DEFAULT_MAX_COLUMNS = 4;

const FlexGalleryComponent = ({galleryClassName, objs, keyPath, component,
    maxColumns}) => {

  galleryClassName = isNotEmpty(galleryClassName) ? galleryClassName : '';
  galleryClassName += ' flex-gallery';
  galleryClassName = galleryClassName.trim();

  maxColumns = coalesce(maxColumns, DEFAULT_MAX_COLUMNS);

  return (
    <div className={galleryClassName}>
      {getItems({objs, keyPath, component, maxColumns})}
    </div>
  );
};

const getItems = ({objs, keyPath, component, maxColumns}) => {
  return objs.map((obj) => (
    <div className="item"
         key={obj[keyPath]}
         style={{flex: `0 0 ${100 / maxColumns}%`}}>
      {component(obj)}
    </div>
  ));
};

export default FlexGalleryComponent;
