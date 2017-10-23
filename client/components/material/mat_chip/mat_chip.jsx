import React from 'react';
import { isNotEmpty } from '../../../util/empty';
import { GRID } from '../grid/grid';

const TEXT_ICON_SEPARATION = GRID;

const MatChip = ({chipClassName, text, icon, onClick}) => {
  chipClassName = isNotEmpty(chipClassName) ? chipClassName : '';
  chipClassName += ' mat-chip';
  chipClassName = chipClassName.trim();

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

  return (
    <span className={chipClassName}
         onClick={onClick}>
      {text}{$icon}
    </span>
  );
};

export default MatChip;
