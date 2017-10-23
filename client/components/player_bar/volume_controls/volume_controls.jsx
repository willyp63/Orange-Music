import React from 'react';

import { MatButton } from '../../material/index';

// <MatSliderComponent value={volume}
//                     maxValue={maxVolume}
//                     isDisabled={isDisabled}
//                     onValueChange={onVolumeChange} />

const VolumeControlsComponent = ({volume, maxVolume, onVolumeButtonClick,
    onVolumeChange, isDisabled}) => {
  const volumeButtonIcon = volume === 0 ? 'volume-off' : 'volume-up';
  return (
    <div className="volume-controls">
      <MatButton icon={volumeButtonIcon}
                 isDisabled={isDisabled}
                 onClick={onVolumeButtonClick} />
       <div className='SLIDER GOES HERE'></div>
    </div>
  );
};

export default VolumeControlsComponent;
