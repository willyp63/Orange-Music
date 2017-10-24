import React from 'react';
import { formatTimeMinutesSeconds } from '../../../util/time';
import { MatSlider } from '../../material/index';

const ProgressBarComponent = ({currentTime, duration, onCurrentTimeChange,
    isDisabled}) => {

  return (
    <div className="progress-bar">
      <div className="time-label">
        {formatTimeMinutesSeconds(currentTime)}
      </div>
      <MatSlider value={currentTime}
                 maxValue={duration}
                 isDisabled={isDisabled}
                 onValueChange={onCurrentTimeChange} />
      <div className="time-label">
        {formatTimeMinutesSeconds(duration)}
      </div>
    </div>
  );
};

export default ProgressBarComponent;
