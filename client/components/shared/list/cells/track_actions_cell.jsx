import React from 'react';
import { MatButton } from '../../../material/index';

const TrackActionsCellComponent = (_, track, actions) => {
  return (
    <div className="track-actions-cell">
      <MatButton buttonClassName={'play-btn'}
                 icon={'play'}
                 isRaised={true}
                 isCircle={true}
                 onClick={() => actions.playTrack(track)} />
               <MatButton buttonClassName={'add-to-queue-btn'}
                 icon={'plus'}
                 isRaised={true}
                 isCircle={true}
                 onClick={() => actions.addTrackToQueue(track)} />
    </div>
  );
};

export default TrackActionsCellComponent;
