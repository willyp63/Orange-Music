import React from 'react';

import { isNotEmpty } from '../../../../util/empty';

import MatButtonComponent from '../../../material/mat_button/mat_button';

const ControlButtonComponent = ({icon, onClick, isDisabled, buttonClassName}) => {
  buttonClassName = isNotEmpty(buttonClassName) ? buttonClassName : '';
  buttonClassName += ' control-btn';
  buttonClassName = buttonClassName.trim();

  return (
    <MatButtonComponent buttonClassName={buttonClassName}
                        wrapClassName={'control-btn-wrap'}
                        icon={icon}
                        isCircle={true}
                        isText={true}
                        isDisabled={isDisabled}
                        onClick={onClick}>
    </MatButtonComponent>
  );
}

export default ControlButtonComponent;
