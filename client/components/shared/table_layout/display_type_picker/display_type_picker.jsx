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
    throw 'DisplayTypePickerComponent: all properties are required!';
  }

  let galleryBtnClassName = 'gallery-btn';
  let listBtnClassName = 'list-btn';
  if (selectedDisplayType === TABLE_DISPLAY_TYPES.GALLERY) {
    galleryBtnClassName += ' active';
  } else {
    listBtnClassName += ' active';
  }

  return (
    <div className='display-type-picker'>
      <MatButton className={galleryBtnClassName}
                 icon={'view_module'}
                 onClick={() => {
                   if (selectedDisplayType !== TABLE_DISPLAY_TYPES.GALLERY) {
                     onDisplayTypeSelect(TABLE_DISPLAY_TYPES.GALLERY);
                   }
                 }} />
      <MatButton className={listBtnClassName}
                 icon={'list'}
                 onClick={() => {
                   if (selectedDisplayType !== TABLE_DISPLAY_TYPES.LIST) {
                     onDisplayTypeSelect(TABLE_DISPLAY_TYPES.LIST);
                   }
                 }} />
    </div>
  );
};

export default DisplayTypePickerComponent;
