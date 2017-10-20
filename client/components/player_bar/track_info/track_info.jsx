import React from 'react';

import { isNotEmpty } from '../../../util/empty';

const TrackInfoComponent = ({trackName, artistName, imageSrc}) => {
  return isNotEmpty(trackName) &&
         isNotEmpty(artistName) &&
         isNotEmpty(imageSrc)
    ? (
      <div className="track-info">
        <img src={imageSrc} />
        <div className="info-text">
          <div className="track-name">
            {trackName}
          </div>
          <div className="artist-name">
            {artistName}
          </div>
        </div>
      </div>
    ) : (
      <div className="track-info">
        <div className="place-holder-img"></div>
      </div>
    );
}

export default TrackInfoComponent;
