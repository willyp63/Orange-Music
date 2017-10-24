import React from 'react';

import { MatButton, MatSlider } from '../../material/index';

// <MatSliderComponent value={volume}
//                     maxValue={maxVolume}
//                     isDisabled={isDisabled}
//                     onValueChange={onVolumeChange} />

const VolumeControlsComponent = ({volume, maxVolume, onVolumeButtonClick,
    onVolumeChange, isDisabled}) => {
  const volumeButtonIcon = volume === 0 ? 'volume_off' : 'volume_up';
  return (
    <div className="volume-controls">
      <div className="controls-container">
        <MatButton icon={volumeButtonIcon}
                   isDisabled={isDisabled}
                   isCircle={true}
                   onClick={onVolumeButtonClick} />
        <MatSlider value={volume}
                   maxValue={maxVolume}
                   isDisabled={isDisabled}
                   onValueChange={onVolumeChange} />
      </div>
    </div>
  );
};

export default VolumeControlsComponent;
