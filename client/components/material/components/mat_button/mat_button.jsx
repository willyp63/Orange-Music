import React from 'react';
import MatRipple from '../mat_ripple/mat_ripple';
import MatTooltip from '../mat_tooltip/mat_tooltip';
import Grid from '../../css/grid';
const { GRID } = Grid;

const MatButton = ({text, icon, tooltipText, isSubmit, isDisabled, onClick, className}) => {
  className = className ? className + ' mat-btn' : 'mat-btn';
  const buttonClassName = isDisabled ? 'disabled' : '';

  // Format icon (https://material.io/icons/).
  const marginLeft = text ? Grid.GRID : 0; // Separate icon from text.
  let $icon = '';
  if (typeof icon === 'string' && icon.length > 0) {
    if (icon.startsWith('icon-')) {
      $icon = (<i className={icon} style={{marginLeft}}></i>);
    } else {
      $icon = (<i className="material-icons" style={{marginLeft}}>{icon}</i>);
    }
  }

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

  if (tooltipText) {
    $button = (<MatTooltip text={tooltipText}>{$button}</MatTooltip>);
  }

  return (
    <span className={className}>{$button}</span>
  );
}

export default MatButton;
