import React from 'react';
import MatRipple from '../mat_ripple/mat_ripple';
import Grid from '../../css/grid';

const MatButton = ({text, icon, isCircle, isRaised, isSubmit,
    isDisabled, onClick, className, wrapClassName}) => {

  // Format button class name.
  className = className ? className + ' mat-btn' : 'mat-btn';
  if (isDisabled) { className += ' disabled'; }
  if (isCircle) { className += ' cir'; }
  if (isRaised) { className += ' raised'; }

  // Format wrap class name.
  wrapClassName = wrapClassName ? wrapClassName + ' mat-btn-wrap' : 'mat-btn-wrap';

  // Format icon (uses font awesome icons).
  const $icon = (typeof icon === 'string' && icon.length > 0)
    ? (<i className="material-icons"
          style={{marginLeft: text ? Grid.GRID : 0}}>
         {icon}
       </i>)
    : '';

  // Render button w/o wrap or ripple.
  let $button = (
    <button className={className}
            onClick={onClick}
            type={isSubmit ? 'submit' : 'button'}>
      {text}{$icon}
    </button>
  );

  // If not disabled, wrap button in ripple.
  if (!isDisabled) {
    $button = (
      <MatRipple isCircle={isCircle}>
        {$button}
      </MatRipple>
    );
  }

  return (
    <div className={wrapClassName}>
      {$button}
    </div>
  );
}

export default MatButton;
