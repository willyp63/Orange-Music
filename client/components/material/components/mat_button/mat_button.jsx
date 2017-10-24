import React from 'react';
import MatRipple from '../mat_ripple/mat_ripple';
import Grid from '../../css/grid';
const { GRID } = Grid;

const MatButton = ({text, icon, isSubmit, isDisabled, onClick, className}) => {
  className = className ? className + ' mat-btn' : 'mat-btn';
  const buttonClassName = isDisabled ? 'disabled' : '';

  // Format icon (https://material.io/icons/).
  const marginLeft = text ? Grid.GRID : 0; // Separate icon from text.
  const $icon = (typeof icon === 'string' && icon.length > 0)
    ? (<i className="material-icons" style={{marginLeft}}>{icon}</i>)
    : '';

  // Render button w/o wrap or ripple.
  let $button = (
    <button className={buttonClassName}
            type={isSubmit ? 'submit' : 'button'}
            onClick={onClick}>
      {text}{$icon}
    </button>
  );

  // If not disabled, wrap button in ripple.
  if (!isDisabled) { $button = (<MatRipple>{$button}</MatRipple>); }

  return (
    <span className={className}>{$button}</span>
  );
}

export default MatButton;
