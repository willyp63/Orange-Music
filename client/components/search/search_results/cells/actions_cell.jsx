import React from 'react';

import MatButtonComponent from '../../../shared/mat_button/mat_button';
import { blue, blue_darken_1, green, green_darken_1, orange, orange_darken_1 } from '../../../shared/mat_color/mat_color';

const ActionsCellComponent = (_, actions, track) => {
  return (
    <div className="actions-cell">
      <MatButtonComponent buttonClassName={'action-btn play-btn'}
                 wrapClassName={'action-btn-wrap'}
                 icon={'play'}
                 tooltip={'Play'}
                 isCircle={true}
                 bgColor={blue_darken_1}
                 bgColorHover={blue}
                 onClick={actions.playTrack.bind(track)}>
      </MatButtonComponent>
      <MatButtonComponent buttonClassName={'action-btn add-btn'}
                 wrapClassName={'action-btn-wrap'}
                 icon={'plus'}
                 tooltip={'Add to Queue'}
                 isCircle={true}
                 bgColor={green_darken_1}
                 bgColorHover={green}
                 onClick={() => {
                   console.log('You added a song');
                 }}>
      </MatButtonComponent>
      <MatButtonComponent buttonClassName={'action-btn add-btn'}
                 wrapClassName={'action-btn-wrap'}
                 icon={'plus'}
                 tooltip={'Add to Playlist'}
                 isCircle={true}
                 bgColor={orange_darken_1}
                 bgColorHover={orange}
                 onClick={() => {
                   console.log('You added a song');
                 }}>
      </MatButtonComponent>
    </div>
  );
}

export default ActionsCellComponent;
