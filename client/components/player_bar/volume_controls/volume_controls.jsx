import React from 'react';

import MatSliderComponent from '../../shared/mat_slider/mat_slider';
import MatButtonComponent from '../../shared/mat_button/mat_button';
import { white, grey_lighten_4 } from '../../shared/mat_color/mat_color';
import { GRID } from '../../shared/grid/grid';

const VOLUME_BAR_HANDLE_WIDTH = GRID * 2;

const VolumeControlsComponent = ({volume, maxVolume, onVolumeButtonClick, onVolumeChange}) => {
  const volumeButtonIcon = volume === 0 ? 'volume-off' : 'volume-up';
  return (
    <div className="volume-controls">
      <MatButtonComponent buttonClassName={'volume-btn'}
                          wrapClassName={'volume-btn-wrap'}
                          icon={volumeButtonIcon}
                          isCircle={true}
                          isText={true}
                          color={grey_lighten_4}
                          colorHover={white}
                          onClick={onVolumeButtonClick}>
      </MatButtonComponent>
      <MatSliderComponent value={volume}
                          maxValue={maxVolume}
                          handleWidth={VOLUME_BAR_HANDLE_WIDTH}
                          onValueChange={onVolumeChange}>
      </MatSliderComponent>
    </div>
  );
};

export default VolumeControlsComponent;
