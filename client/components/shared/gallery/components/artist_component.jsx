import React from 'react';

import { isNotEmpty } from '../../../../util/empty';
import { EMPTY_IMG_SRC } from '../../../../util/image';
import { getImageUrl } from '../../../../api/last_fm/last_fm_api';

import MatChip from '../../../material/mat_chip/mat_chip';

const IMAGE_IDX = 3;

const ArtistGalleryComponent = (artist) => {
  const imageSrc = isNotEmpty(artist)
    ? getImageUrl(artist.image, IMAGE_IDX)
    : EMPTY_IMG_SRC;

  return (
    <div className="artist-item">
      <img src={imageSrc} />
      <div className="artist-info">
        <MatChip chipClassName='artist-name'
                 text={artist.name} />
      </div>
    </div>
  );
};

export default ArtistGalleryComponent;
