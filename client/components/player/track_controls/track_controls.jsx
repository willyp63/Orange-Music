import React from 'react';
import { MatButton } from '../../material/index';

const TrackControls = ({isPlaying, isDisabled, onPrev, onPlayPause, onNext}) => {
  const playPauseButtonIcon = isPlaying ? 'pause' : 'play_arrow';
  return (
    <div className="track-controls">
      <MatButton buttonClassName={'prev-btn'}
                 icon={'skip_previous'}
                 onClick={onPrev} />
      <MatButton buttonClassName={'play-pause-btn'}
                 icon={playPauseButtonIcon}
                 isDisabled={isDisabled}
                 onClick={onPlayPause} />
      <MatButton buttonClassName={'next-btn'}
                 icon={'skip_next'}
                 onClick={onNext} />
    </div>
  );
}

export default TrackControls;
