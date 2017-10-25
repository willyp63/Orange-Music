import React from 'react';
import Grid from '../../css/grid';
const { GRID } = Grid;

const MatChip = ({className, text, icon, onClick}) => {
  className = className ? className + ' mat-chip' : 'mat-chip';

  // Format icon (https://material.io/icons/).
  const marginLeft = text ? Grid.GRID : 0; // Separate icon from text.
  const $icon = (typeof icon === 'string' && icon.length > 0)
    ? (<i className="material-icons" style={{marginLeft}}>{icon}</i>)
    : '';

  return (
    <span className={className} onClick={onClick}>
      {text}{$icon}
    </span>
  );
};

export default MatChip;
