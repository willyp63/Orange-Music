import React from 'react';
import MatRipple from '../mat_ripple/mat_ripple';

const MatButton = ({text, icon, isCircle, isRaised, isSubmit,
    isDisabled, onClick, buttonClassName, wrapClassName}) => {

  // Format button class name.
  buttonClassName = buttonClassName + ' mat-btn';
  if (isDisabled) { buttonClassName += ' disabled'; }
  if (isCircle) { buttonClassName += ' cir'; }
  if (isRaised) { buttonClassName += ' raised'; }
  buttonClassName = buttonClassName.trim();

  // Format wrap class name.
  wrapClassName = (wrapClassName + ' mat-btn-wrap').trim();

  // Format icon (uses font awesome icons).
  const $icon = (typeof icon === 'string' && icon.length > 0)
    ? (<i className={`fa fa-${icon}`}></i>)
    : '';

  // Render button w/o wrap or ripple.
  let $button = (
    <button className={buttonClassName}
            onClick={onClick}
            type={isSubmit ? 'submit' : 'button'}>
      {text}{$icon}
    </button>
  );

  // If not disabled, wrap button in ripple.
  if (isDisabled === false) {
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
