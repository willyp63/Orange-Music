import React from 'react';
import { formatTimeMinutesSeconds } from '../../../util/time';

// <MatSlider value={currentTime}
//            maxValue={duration}
//            isDisabled={isDisabled}
//            onValueChange={onCurrentTimeChange} />

const ProgressBarComponent = ({currentTime, duration, onCurrentTimeChange,
    isDisabled}) => {

  return (
    <div className="progress-bar">
      <div className="time-label">
        {formatTimeMinutesSeconds(currentTime)}
      </div>
      <div className='SLIDER GOES HERE'></div>
      <div className="time-label">
        {formatTimeMinutesSeconds(duration)}
      </div>
    </div>
  );
};

export default ProgressBarComponent;
