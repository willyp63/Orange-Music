import React from 'react';
import { MatButton } from '../../material/index';

const TrackControlsComponent = ({isPlaying, isDisabled, onPrev, onPlayPause, onNext}) => {
  const playPauseButtonIcon = isPlaying ? 'pause-circle' : 'play-circle';
  return (
    <div className="track-controls">
      <MatButton buttonClassName={'prev-btn'}
                 icon={'step-backward'}
                 isDisabled={isDisabled}
                 onClick={onPrev} />
      <MatButton buttonClassName={'play-pause-btn'}
                 icon={playPauseButtonIcon}
                 isDisabled={isDisabled}
                 onClick={onPlayPause} />
      <MatButton buttonClassName={'next-btn'}
                 icon={'step-forward'}
                 isDisabled={isDisabled}
                 onClick={onNext} />
    </div>
  );
}

export default TrackControlsComponent;
