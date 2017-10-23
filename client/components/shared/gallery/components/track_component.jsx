import React from 'react';

import { isNotEmpty } from '../../../../util/empty';
import { EMPTY_IMG_SRC } from '../../../../util/image';
import { getImageUrl } from '../../../../api/last_fm/last_fm_api';

import MatChip from '../../../material/mat_chip/mat_chip';

const IMAGE_IDX = 3;

const TrackGalleryComponent = (track) => {
  const imageSrc = isNotEmpty(track)
    ? getImageUrl(track.image, IMAGE_IDX)
    : EMPTY_IMG_SRC;

  return (
    <div className="track-item">
      <img src={imageSrc} />
      <div className="track-info">
        <MatChip chipClassName='track-name'
                 text={track.name} />
               <MatChip chipClassName='artist-name'
                 text={track.artist.name} />
      </div>
    </div>
  );
};

export default TrackGalleryComponent;
