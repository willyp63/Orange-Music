import React from 'react';
import { isNotEmpty } from '../../../../../../util/empty';
import { EMPTY_IMG_SRC, getImageUrl } from '../../../../../../util/image';

const IMAGE_IDX = 1;

const ImageCell = (images) => {
  const imageSrc = isNotEmpty(images) ? getImageUrl(images, IMAGE_IDX) : EMPTY_IMG_SRC;

  let className = 'image-cell';
  if (imageSrc === EMPTY_IMG_SRC) { className += ' bordered'; }

  return (
    <div className={className}>
      <img src={imageSrc} />
    </div>
  );
};

export default ImageCell;
