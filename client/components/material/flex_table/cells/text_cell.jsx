import React from 'react';
import { isNotEmpty } from '../../../../util/empty';

const DEFAULT_TEXT = '--';

const TextCellComponent = (text) => (
  <div className="text-cell">
    {isNotEmpty(text) ? text.toString() : DEFAULT_TEXT}
  </div>
);

export default TextCellComponent;
