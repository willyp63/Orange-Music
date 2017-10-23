import React from 'react';

import MatSliderComponent from '../../material/mat_slider/mat_slider';
import MatButtonComponent from '../../material/mat_button/mat_button';
import { GRID } from '../../material/grid/grid';

const VOLUME_BAR_HANDLE_WIDTH = GRID * 2;

const VolumeControlsComponent = ({volume, maxVolume, onVolumeButtonClick,
    onVolumeChange, isDisabled}) => {
  const volumeButtonIcon = volume === 0 ? 'volume-off' : 'volume-up';
  return (
    <div className="volume-controls">
      <MatButtonComponent buttonClassName={'volume-btn'}
                          wrapClassName={'volume-btn-wrap'}
                          icon={volumeButtonIcon}
                          isCircle={true}
                          isText={true}
                          isDisabled={isDisabled}
                          onClick={onVolumeButtonClick}>
      </MatButtonComponent>
      <MatSliderComponent value={volume}
                          maxValue={maxVolume}
                          isDisabled={isDisabled}
                          handleWidth={VOLUME_BAR_HANDLE_WIDTH}
                          onValueChange={onVolumeChange}>
      </MatSliderComponent>
    </div>
  );
};

export default VolumeControlsComponent;
