import React from 'react';

import ControlButtonComponent from './control_button/control_button';

const TrackControlsComponent = ({isPlaying, isDisabled, onPrev, onPlayPause, onNext}) => {
  const playPauseButtonIcon = isPlaying ? 'pause-circle' : 'play-circle';
  return (
    <div className="track-controls">
      <ControlButtonComponent buttonClassName={'prev-btn'}
                              icon={'step-backward'}
                              isDisabled={isDisabled}
                              onClick={onPrev}>
      </ControlButtonComponent>
      <ControlButtonComponent buttonClassName={'play-pause-btn'}
                              icon={playPauseButtonIcon}
                              isDisabled={isDisabled}
                              onClick={onPlayPause}>
      </ControlButtonComponent>
      <ControlButtonComponent buttonClassName={'next-btn'}
                              icon={'step-forward'}
                              isDisabled={isDisabled}
                              onClick={onNext}>
      </ControlButtonComponent>
    </div>
  );
}

export default TrackControlsComponent;
