import React from 'react';
import { isEmpty } from '../../../../util/empty';
import { MatButton } from '../../../material/index';

export const TABLE_DISPLAY_TYPES = {
  GALLERY: 0,
  LIST: 1,
};

const DisplayTypePickerComponent = ({ selectedDisplayType, onDisplayTypeSelect }) => {
  if (isEmpty(selectedDisplayType) ||
      typeof onDisplayTypeSelect !== 'function') {
    throw 'DisplayTypePickerComponent: missing required props!';
  }

  const onButtonClick = (clickedDisplayType) => {
    if (selectedDisplayType !== clickedDisplayType) {
      onDisplayTypeSelect(clickedDisplayType);
    }
  };

  const getClassName = (displayType) => {
    return selectedDisplayType === displayType ? 'active' : '';
  };

  return (
    <div className='display-type-picker'>
      <MatButton className={getClassName(TABLE_DISPLAY_TYPES.GALLERY)}
                 icon={'view_module'}
                 onClick={() => { onButtonClick(TABLE_DISPLAY_TYPES.GALLERY); }} />
      <MatButton className={getClassName(TABLE_DISPLAY_TYPES.LIST)}
                 icon={'view_list'}
                 onClick={() => { onButtonClick(TABLE_DISPLAY_TYPES.LIST); }} />
    </div>
  );
};

export default DisplayTypePickerComponent;
