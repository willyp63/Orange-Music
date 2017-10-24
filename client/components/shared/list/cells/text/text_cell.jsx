import React from 'react';
import { isNotEmpty } from '../../../../../util/empty';

const TextCellComponent = (text) => (isNotEmpty(text) ? text.toString() : '');

export default TextCellComponent;
