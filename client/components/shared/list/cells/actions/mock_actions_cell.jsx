import React from 'react';
import { GRID } from '../../../../material/index';

const BUTTON_SIZE = GRID * 8;
const BUTTON_MARGIN = GRID;

const MockActionsCellComponent = (_, __, ___, schema) => {
  const numButtons = Object.keys(schema).length;
  return (
    <div className="mock-track-actions-cell"
         style={{width: numButtons * BUTTON_SIZE + (numButtons - 1) * BUTTON_MARGIN}}>
    </div>
  );
};

export default MockActionsCellComponent;
