import React from 'react';
import { MatButton } from '../../../material/index';

const TrackActionsCellComponent = (_, track, actions) => {
  return (
    <div className="queue-track-actions-cell">
      <MatButton buttonClassName={'remove-from-queue-btn'}
                 icon={'minus'}
                 isRaised={true}
                 isCircle={true}
                 onClick={() => actions.removeTrackFromQueue(track)} />
    </div>
  );
};

export default TrackActionsCellComponent;
