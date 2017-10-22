import React from 'react';

import MatButtonComponent from '../../../shared/mat_button/mat_button';
import { blue, blue_darken_1, green, green_darken_1 } from '../../../shared/mat_color/mat_color';

const ActionsCellComponent = (_, actions, track) => {
  return (
    <div className="actions-cell">
      <MatButtonComponent buttonClassName={'action-btn play-btn'}
                 wrapClassName={'action-btn-wrap'}
                 icon={'play'}
                 isCircle={true}
                 bgColor={blue_darken_1}
                 bgColorHover={blue}
                 onClick={() => actions.playTrack(track)}>
      </MatButtonComponent>
      <MatButtonComponent buttonClassName={'action-btn add-btn'}
                 wrapClassName={'action-btn-wrap'}
                 icon={'plus'}
                 tooltip={'add to queue'}
                 isCircle={true}
                 bgColor={green_darken_1}
                 bgColorHover={green}
                 onClick={() => actions.addTrackToQueue(track)}>
      </MatButtonComponent>
    </div>
  );
}

export default ActionsCellComponent;
