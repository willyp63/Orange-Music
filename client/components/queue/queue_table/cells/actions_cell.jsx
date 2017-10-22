import React from 'react';

import MatButtonComponent from '../../../shared/mat_button/mat_button';
import { red, red_darken_1 } from '../../../shared/mat_color/mat_color';

const ActionsCellComponent = (_, actions, track) => {
  return (
    <div className="actions-cell">
      <MatButtonComponent buttonClassName={'action-btn remove-btn'}
                          wrapClassName={'action-btn-wrap'}
                          icon={'minus'}
                          tooltip={'remove from queue'}
                          isCircle={true}
                          bgColor={red_darken_1}
                          bgColorHover={red}
                          onClick={() => actions.removeTrackFromQueue(track)}>
      </MatButtonComponent>
    </div>
  );
}

export default ActionsCellComponent;
