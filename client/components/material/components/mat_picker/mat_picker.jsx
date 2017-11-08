import React from 'react';
import MatButton from '../mat_button/mat_button';

const MatPicker = ({options, onOptionSelect}) => {
  const $options = options.map(option => {
    return (
      <MatButton text={option} onClick={onOptionSelect.bind(null, option)} key={option} />
    );
  });

  return (
    <div className='mat-picker'>
      {$options}
    </div>
  );
};

export default MatPicker;
