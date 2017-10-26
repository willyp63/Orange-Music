import React from 'react';
import { isNotEmpty } from '../../../../../../util/empty';
import { EMPTY_IMG_SRC } from '../../../../../../util/image';
import { getImageUrl } from '../../../../../../api/last_fm/last_fm_api';

const IMAGE_IDX = 1;

const ImageCellComponent = (images) => {
  const imageSrc = isNotEmpty(images) ? getImageUrl(images, IMAGE_IDX) : EMPTY_IMG_SRC;

  let className = 'image-cell';
  if (imageSrc === EMPTY_IMG_SRC) { className += ' bordered'; }

  return (
    <div className={className}>
      <img src={imageSrc} />
    </div>
  );
};

export default ImageCellComponent;
