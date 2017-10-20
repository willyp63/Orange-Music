import React from 'react';

import { formatTimeMinutesSeconds } from '../../../util/time';

import MatSliderComponent from '../../shared/mat_slider/mat_slider';
import { GRID } from '../../shared/grid/grid';

const PROGRESS_BAR_HANDLE_SIZE = GRID * 2;

const ProgressBarComponent = ({currentTime, duration, onCurrentTimeChange,
    isDisabled}) => {

  return (
    <div className="progress-bar">
      <div className="time-label">
        {formatTimeMinutesSeconds(currentTime)}
      </div>
      <MatSliderComponent value={currentTime}
                          maxValue={duration}
                          isDisabled={isDisabled}
                          handleWidth={PROGRESS_BAR_HANDLE_SIZE}
                          onValueChange={onCurrentTimeChange}>
      </MatSliderComponent>
      <div className="time-label">
        {formatTimeMinutesSeconds(duration)}
      </div>
    </div>
  );
};

export default ProgressBarComponent;
