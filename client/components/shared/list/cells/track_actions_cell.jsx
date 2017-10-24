import React from 'react';
import { MatButton } from '../../../material/index';

const TrackActionsCellComponent = (_, track, actions) => {
  return (
    <div className="track-actions-cell">
      <MatButton className={'play-btn'}
                 icon={'play_arrow'}
                 isRaised={true}
                 isCircle={true}
                 onClick={() => actions.playTrack(track)} />
      <MatButton className={'add-to-queue-btn'}
                 icon={'add'}
                 isRaised={true}
                 isCircle={true}
                 onClick={() => actions.addTrackToQueue(track)} />
    </div>
  );
};

export default TrackActionsCellComponent;
