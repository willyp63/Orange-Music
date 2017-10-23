// Credit to Codepen user: jczimm
// https://codepen.io/jczimm/pen/vEBpoL

import React from 'react';

import { isNotEmpty } from '../../../util/empty';

import { GRID } from '../grid/grid';

const SPINNER_CLASS_NAME = 'mat-spinner';
const SVG_CLASS_NAME = 'circular';
const CIRCLE_CLASS_NAME = 'path';

const DEFAULT_STROKE_WIDTH = GRID / 2;
const DEFAULT_SIZE = GRID * 10;

const MatSpinnerComponent = ({spinnerClassName, size, strokeWidth}) => {
  spinnerClassName = isNotEmpty(spinnerClassName) ? spinnerClassName : '';
  spinnerClassName += ` ${SPINNER_CLASS_NAME}`;
  spinnerClassName = spinnerClassName.trim();

  size = isNotEmpty(size) ? size : DEFAULT_SIZE;
  strokeWidth = isNotEmpty(strokeWidth) ? strokeWidth : DEFAULT_STROKE_WIDTH;

  const svgViewBox = `${size / 4} ${size / 4} ${size / 2} ${size / 2}`;
  return (
    <div className={spinnerClassName}
         style={{
           width: size
         }}>
      <svg className={SVG_CLASS_NAME}
           viewBox={svgViewBox}>
        <circle className={CIRCLE_CLASS_NAME}
                cx={size / 2}
                cy={size / 2}
                r={size / 5}
                fill="none"
                strokeWidth={strokeWidth}
                strokeMiterlimit="10"/>
      </svg>
    </div>
  )
};

export default MatSpinnerComponent;
