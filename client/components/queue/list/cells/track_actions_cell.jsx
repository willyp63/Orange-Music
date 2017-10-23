import React from 'react';
import MatButtonComponent from '../../../material/mat_button/mat_button';

const TrackActionsCellComponent = (_, track, actions) => {
  return (
    <div className="queue-track-actions-cell">
      <MatButtonComponent buttonClassName={'action-btn remove-from-queue-btn'}
                          wrapClassName={'action-btn-wrap'}
                          icon={'minus'}
                          isCircle={true}
                          onClick={() => actions.removeTrackFromQueue(track)} />
    </div>
  );
};

export default TrackActionsCellComponent;
