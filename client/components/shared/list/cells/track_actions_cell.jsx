import React from 'react';
import MatButtonComponent from '../../../material/mat_button/mat_button';

const TrackActionsCellComponent = (_, track, actions) => {
  return (
    <div className="track-actions-cell">
      <MatButtonComponent buttonClassName={'action-btn play-btn'}
                          wrapClassName={'action-btn-wrap'}
                          icon={'play'}
                          isCircle={true}
                          onClick={() => actions.playTrack(track)} />
      <MatButtonComponent buttonClassName={'action-btn add-to-queue-btn'}
                          wrapClassName={'action-btn-wrap'}
                          icon={'plus'}
                          tooltip={'add to queue'}
                          isCircle={true}
                          onClick={() => actions.addTrackToQueue(track)} />
    </div>
  );
};

export default TrackActionsCellComponent;
