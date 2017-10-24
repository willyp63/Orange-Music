import React from 'react';
import { MatButton } from '../../material/index';

const TrackControlsComponent = ({isPlaying, isDisabled, onPrev, onPlayPause, onNext}) => {
  const playPauseButtonIcon = isPlaying ? 'pause' : 'play_arrow';
  return (
    <div className="track-controls">
      <MatButton buttonClassName={'prev-btn'}
                 icon={'skip_previous'}
                 isCircle={true}
                 isDisabled={isDisabled}
                 onClick={onPrev} />
      <MatButton buttonClassName={'play-pause-btn'}
                 icon={playPauseButtonIcon}
                 isCircle={true}
                 isDisabled={isDisabled}
                 onClick={onPlayPause} />
      <MatButton buttonClassName={'next-btn'}
                 icon={'skip_next'}
                 isCircle={true}
                 isDisabled={isDisabled}
                 onClick={onNext} />
    </div>
  );
}

export default TrackControlsComponent;
