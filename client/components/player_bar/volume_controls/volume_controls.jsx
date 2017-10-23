import React from 'react';

import { MatSlider, MatButton } from '../../material/index';

const VolumeControlsComponent = ({volume, maxVolume, onVolumeButtonClick,
    onVolumeChange, isDisabled}) => {
  const volumeButtonIcon = volume === 0 ? 'volume-off' : 'volume-up';
  return (
    <div className="volume-controls">
      <MatButton icon={volumeButtonIcon}
                 isDisabled={isDisabled}
                 onClick={onVolumeButtonClick} />
      <MatSliderComponent value={volume}
                          maxValue={maxVolume}
                          isDisabled={isDisabled}
                          onValueChange={onVolumeChange} />
    </div>
  );
};

export default VolumeControlsComponent;
