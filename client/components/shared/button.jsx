import React from 'react';
import ReactTooltip from 'simple-react-tooltip';

import { isNotEmpty } from '../../util/empty';
import Ripple from './ripple';
import { white, transparent } from './color';

const MatButton = ({iconName, isCircle, isText, isDisabled, onClick, tooltip,
    buttonClassName, color, bgColor, colorHover, bgColorHover, isSubmit}) => {

  let className = 'mat-btn';
  if (isDisabled) { className += ' disabled'; }
  if (isText) { className += ' txt-btn'; }
  if (isCircle) { className += ' circle-btn'; }
  if (isNotEmpty(buttonClassName)) { className += ` ${buttonClassName}`; }

  color = isNotEmpty(color) ? color : white;
  colorHover = isNotEmpty(colorHover) ? colorHover : color;

  bgColor = isNotEmpty(bgColor) ? bgColor : transparent;
  bgColorHover = isNotEmpty(bgColorHover) ? bgColorHover : bgColor;

  const buttonStyle = {
    'color': color,
    'backgroundColor': bgColor
  }

  const icon = isNotEmpty(iconName) ? (<i className={'fa fa-' + iconName}></i>) : '';

  const button = (
    <div>
      <button className={className}
              data-tip={tooltip}
              onClick={onClick}
              style={buttonStyle}
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
        {icon}
      </button>
      {isNotEmpty(tooltip) ? (<ReactTooltip effect={'solid'} />) : ''}
    </div>
  );

  return isDisabled
    ? (<div className={buttonClassName}>{button}</div>)
    : (
      <div className={buttonClassName}>
        <Ripple isCircle={isCircle}>{button}</Ripple>
      </div>
    );
}

export default MatButton;
