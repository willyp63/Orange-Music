import React from 'react';

const MatTooltip = ({text, children}) => {
  return (
    <div className='mat-tooltip'>
      {children}
      <div className='tooltip'>
        <div>{text}</div>
      </div>
    </div>
  )
};

export default MatTooltip;
