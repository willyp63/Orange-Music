import React from 'react';
import ReactTooltip from 'simple-react-tooltip';

import { isNotEmpty } from '../../../util/empty';

import MatRippleComponent from '../mat_ripple/mat_ripple';
import { GRID } from '../grid/grid';

const BUTTON_CLASS_NAME = 'mat-btn';
const WRAP_CLASS_NAME = 'mat-btn-wrap';
const DISABLED_CLASS_NAME = 'disabled';
const TEXT_CLASS_NAME = 'btn-txt';
const CIRCLE_CLASS_NAME = 'btn-cir';
const HOVERED_CLASS_NAME = 'hovered';

const TEXT_ICON_SEPARATION = GRID;

class MatButtonComponent extends React.Component {
  render() {
    const { icon, isCircle, isText, isDisabled, onClick, tooltip,
      buttonClassName, isSubmit, text, wrapClassName } = this.props;

    // Format button class name.
    let buttonClassName1 = isNotEmpty(buttonClassName) ? buttonClassName : '';
    buttonClassName1 += ` ${BUTTON_CLASS_NAME}`;
    if (isDisabled) { buttonClassName1 += ` ${DISABLED_CLASS_NAME}`; }
    if (isText) { buttonClassName1 += ` ${TEXT_CLASS_NAME}`; }
    if (isCircle) { buttonClassName1 += ` ${CIRCLE_CLASS_NAME}`; }
    buttonClassName1 = buttonClassName1.trim();

    // Format wrap class name.
    let wrapClassName1 = isNotEmpty(wrapClassName) ? wrapClassName : '';
    wrapClassName1 += ` ${WRAP_CLASS_NAME}`;
    wrapClassName1 = wrapClassName1.trim();

    // Format text and icon.
    let text1 = isNotEmpty(text) ? text : '';
    const $icon = isNotEmpty(icon)
      ? (
          <i className={`fa fa-${icon}`}
             style={{
               marginLeft: isNotEmpty(text1) ? TEXT_ICON_SEPARATION : 0
             }}>
          </i>
        )
      : '';

    // Render button w/o wrap or ripple.
    const $button = (
      <div>
        <button className={buttonClassName1}
                data-tip={tooltip}
                onClick={onClick}
                type={isSubmit ? 'submit' : 'button'}>
          {text1}{$icon}
        </button>
        {isNotEmpty(tooltip) ? (<ReactTooltip effect={'solid'} />) : ''}
      </div>
    );

    // Disabled buttons dont get ripple.
    return isDisabled
      ? (
          <div className={wrapClassName1}
               style={{display: 'inline-block'}}>
            {$button}
          </div>
        )
      : (
        <div className={wrapClassName1}
             style={{display: 'inline-block'}}>
          <MatRippleComponent isCircle={isCircle}>
            {$button}
          </MatRippleComponent>
        </div>
      );
  }
}

export default MatButtonComponent;
