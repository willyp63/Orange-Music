import React from 'react';
import { sentenceCase } from '../util/string';

const MatTooltip = ({text, children}) => {
  return (
    <div className='mat-tooltip'>
      {children}
      <div className='tooltip'>
        <div>{sentenceCase(text)}</div>
      </div>
    </div>
  )
};

export default MatTooltip;
