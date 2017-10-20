import React from 'react';
import ReactTooltip from 'simple-react-tooltip';

import { isNotEmpty } from '../../../util/empty';

import MatRippleComponent from '../mat_ripple/mat_ripple';
import { white, transparent } from '../mat_color/mat_color';
import { GRID } from '../grid/grid';

const BUTTON_CLASS_NAME = 'mat-btn';
const WRAP_CLASS_NAME = 'mat-btn-wrap';
const DISABLED_CLASS_NAME = 'disabled';
const TEXT_CLASS_NAME = 'btn-txt';
const CIRCLE_CLASS_NAME = 'btn-cir';

const TEXT_ICON_SEPARATION = GRID;

const DEFAULT_COLOR = white;
const DEFAULT_BG_COLOR = transparent;

const MatButtonComponent = ({icon, isCircle, isText, isDisabled, onClick,
    tooltip, buttonClassName, color, bgColor, colorHover, bgColorHover,
    isSubmit, text, wrapClassName}) => {

  // Format button class name.
  buttonClassName = isNotEmpty(buttonClassName) ? buttonClassName : '';
  buttonClassName += ` ${BUTTON_CLASS_NAME}`;
  buttonClassName = buttonClassName.trim();
  if (isDisabled) { buttonClassName += ` ${DISABLED_CLASS_NAME}`; }
  if (isText) { buttonClassName += ` ${TEXT_CLASS_NAME}`; }
  if (isCircle) { buttonClassName += ` ${CIRCLE_CLASS_NAME}`; }

  // Format wrap class name.
  wrapClassName = isNotEmpty(wrapClassName) ? wrapClassName : '';
  wrapClassName += ` ${WRAP_CLASS_NAME}`;
  wrapClassName = wrapClassName.trim();

  // Format text and icon.
  text = isNotEmpty(text) ? text : '';
  const $icon = isNotEmpty(icon)
    ? (
        <i className={`fa fa-${icon}`}
           style={{
             marginLeft: isNotEmpty(text) ? TEXT_ICON_SEPARATION : 0
           }}>
        </i>
      )
    : '';

  // Format colors.
  color = isNotEmpty(color) ? color : DEFAULT_COLOR;
  colorHover = isNotEmpty(colorHover) ? colorHover : color;
  bgColor = isNotEmpty(bgColor) ? bgColor : DEFAULT_BG_COLOR;
  bgColorHover = isNotEmpty(bgColorHover) ? bgColorHover : bgColor;

  // Render button w/o wrap or ripple.
  const $button = (
    <div>
      <button className={buttonClassName}
              data-tip={tooltip}
              onClick={onClick}
              style={{
                'color': color,
                'backgroundColor': bgColor
              }}
              type={isSubmit ? 'submit' : 'button'}
              onMouseEnter={(e) => {
                if (isDisabled) { return; }
                e.target.style.color = colorHover;
                e.target.style.backgroundColor = bgColorHover;
              }}
              onMouseLeave={(e) => {
                if (isDisabled) { return; }
                e.target.style.color = color;
                e.target.style.backgroundColor = bgColor;
              }}>
        {text}
        {$icon}
      </button>
      {isNotEmpty(tooltip) ? (<ReactTooltip effect={'solid'} />) : ''}
    </div>
  );

  // Disabled buttons dont get ripple.
  return isDisabled
    ? (
        <div className={wrapClassName}
             style={{display: 'inline-block'}}>
          {$button}
        </div>
      )
    : (
      <div className={wrapClassName}
           style={{display: 'inline-block'}}>
        <MatRippleComponent isCircle={isCircle}>
          {$button}
        </MatRippleComponent>
      </div>
    );
}

export default MatButtonComponent;
