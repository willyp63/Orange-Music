import React from 'react';
import { isNotEmpty, coalesce} from '../../../util/empty';

const DEFAULT_MAX_COLUMNS = 4;

const FlexGalleryComponent = ({className, objs, keyPath, component,
    maxColumns}) => {

  className = isNotEmpty(className) ? className : '';
  className += ' flex-gallery';
  className = className.trim();

  maxColumns = coalesce(maxColumns, DEFAULT_MAX_COLUMNS);

  return (
    <div className={className}>
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
