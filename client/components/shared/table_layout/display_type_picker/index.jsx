import React from 'react';
import Button from 'material-ui/Button';
import { DISPLAY_TYPES } from '../../../../schemas/display_type';
import classNames from 'classnames';

const DisplayTypePicker = ({ displayType, onDisplayTypeChange }) => {
  const onClick = clickedDisplayType => {
    if (displayType !== clickedDisplayType) {
      onDisplayTypeChange(clickedDisplayType);
    }
  };

  return (
    <div className='display-type-picker'>
      <Button className={classNames({active: displayType === DISPLAY_TYPES.GALLERY})}
              onClick={() => { onClick(DISPLAY_TYPES.GALLERY); }}>
        <i className='material-icons'>view_module</i>
      </Button>
      <Button className={classNames({active: displayType === DISPLAY_TYPES.LIST})}
              onClick={() => { onClick(DISPLAY_TYPES.LIST); }}>
        <i className='material-icons'>view_list</i>
      </Button>
    </div>
  );
};

export default DisplayTypePicker;
