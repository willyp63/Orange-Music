import React from 'react';

import MatButton from '../../shared/button';
import { blue, blue_darken_1, green, green_darken_1 } from '../../shared/color';

const ActionsCellComponent = (_, {playTrack}) => (
  <div className="actions-cell">
    <MatButton buttonClassName={'action-button play-button'}
               iconName={'play'}
               tooltip={'Play'}
               isCircle={true}
               bgColor={blue_darken_1}
               bgColorHover={blue}
               onClick={playTrack}>
    </MatButton>
    <MatButton buttonClassName={'action-button add-button'}
               iconName={'plus'}
               tooltip={'Add to Queue'}
               isCircle={true}
               bgColor={green_darken_1}
               bgColorHover={green}
               onClick={() => {
                 console.log('You added a song');
               }}>
    </MatButton>
  </div>
);

export default ActionsCellComponent;
