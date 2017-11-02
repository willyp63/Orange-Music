import React from 'react';
import { isEmpty } from '../../../util/empty';
import { MatButton } from '../../material/index';
import { DISPLAY_TYPES } from '../../../schemas/display';

const DisplayTypePicker = ({ displayType, onDisplayTypeChange }) => {
  const onClick = (clickedDisplayType) => {
    if (displayType !== clickedDisplayType) {
      onDisplayTypeChange(clickedDisplayType);
    }
  };

  const getClassName = (type) => {
    return type === displayType ? 'active' : '';
  };

  return (
    <div className='display-type-picker'>
      <MatButton className={getClassName(DISPLAY_TYPES.GALLERY)}
                 icon={'view_module'}
                 tooltipText='gallery display'
                 onClick={() => { onClick(DISPLAY_TYPES.GALLERY); }} />
      <MatButton className={getClassName(DISPLAY_TYPES.LIST)}
                 icon={'view_list'}
                 tooltipText='list display'
                 onClick={() => { onClick(DISPLAY_TYPES.LIST); }} />
    </div>
  );
};

export default DisplayTypePicker;
