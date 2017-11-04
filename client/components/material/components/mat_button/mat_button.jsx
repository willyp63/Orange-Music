import React from 'react';
import MatRipple from '../mat_ripple/mat_ripple';
import MatTooltip from '../mat_tooltip/mat_tooltip';
import Grid from '../../css/grid';
const { GRID } = Grid;

const MatButton = ({text, icon, tooltipText, isSubmit, isDisabled, onClick,
  className, iconFirst}) => {

  className = className ? className + ' mat-btn' : 'mat-btn';
  const buttonClassName = isDisabled ? 'disabled inner-btn' : 'inner-btn';

  // Separate icon from text.
  const style = iconFirst
    ? {marginRight: text ? Grid.GRID : 0}
    : {marginLeft: text ? Grid.GRID : 0};
  let $icon = '';
  if (typeof icon === 'string' && icon.length > 0) {
    if (icon.startsWith('icon-')) {
      $icon = (<i className={icon} style={style}></i>);
    } else {
      $icon = (<i className="material-icons" style={style}>{icon}</i>);
    }
  }

  const $buttonContent = iconFirst
    ? (<span className={buttonClassName}>{$icon}{text}</span>)
    : (<span className={buttonClassName}>{text}{$icon}</span>);

  // Render button w/o wrap or ripple.
  let $button = (
    <button type={isSubmit ? 'submit' : 'button'}
            onClick={onClick}>
      {$buttonContent}
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
