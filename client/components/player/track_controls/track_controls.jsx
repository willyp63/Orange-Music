import React from 'react';
import { MatButton } from '../../material/index';

const TrackControlsComponent = ({isPlaying, isDisabled, onPrev, onPlayPause, onNext}) => {
  const playPauseButtonIcon = isPlaying ? 'pause_circle_outline' : 'play_circle_outline';
  return (
    <div className="track-controls">
      <MatButton buttonClassName={'prev-btn'}
                 icon={'skip_previous'}
                 isDisabled={isDisabled}
                 onClick={onPrev} />
      <MatButton buttonClassName={'play-pause-btn'}
                 icon={playPauseButtonIcon}
                 isDisabled={isDisabled}
                 onClick={onPlayPause} />
      <MatButton buttonClassName={'next-btn'}
                 icon={'skip_next'}
                 isDisabled={isDisabled}
                 onClick={onNext} />
    </div>
  );
}

export default TrackControlsComponent;
