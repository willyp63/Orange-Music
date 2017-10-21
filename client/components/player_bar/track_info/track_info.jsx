import React from 'react';

import { isNotEmpty } from '../../../util/empty';

const TrackInfoComponent = ({trackName, artistName, imageSrc}) => {
  return (
    <div className="track-info">
      {isNotEmpty(imageSrc) ? (<img src={imageSrc} />) : ''}
      <div className="info-text">
        <div className="track-name">
          {isNotEmpty(trackName) ? trackName : '--'}
        </div>
        <div className="artist-name">
          {isNotEmpty(artistName) ? artistName : '--'}
        </div>
      </div>
    </div>
  );
};

export default TrackInfoComponent;
