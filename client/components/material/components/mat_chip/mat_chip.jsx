import React from 'react';

const MatChip = ({className, text, icon, onClick}) => {
  className = (className + ' mat-chip').trim();

  const $icon = (typeof icon === 'string' && icon.length > 0)
    ? (<i className={`fa fa-${icon}`}></i>)
    : '';

  return (
    <span className={className}
          onClick={onClick}>
      {text}{$icon}
    </span>
  );
};

export default MatChip;
