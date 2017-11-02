import React from 'react';
import { isNotEmpty } from '../../../../../../util/empty';

const TextCell = (text) => (isNotEmpty(text) ? text.toString() : '');

export default TextCell;
