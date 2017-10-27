import React from 'react';
import { EMPTY_IMG_SRC } from '../../../util/image';

const TrackInfoComponent = ({trackName, artistName, imageSrc}) => {
  const $img = imageSrc === EMPTY_IMG_SRC
    ? (<div className='img-placeholder'></div>)
    : (<img src={imageSrc} />);

  return (
    <div className="track-info">
      {$img}
      <div className="info-text">
        <div className="track-name">{trackName}</div>
        <div className="artist-name">{artistName}</div>
      </div>
    </div>
  );
};

export default TrackInfoComponent;
