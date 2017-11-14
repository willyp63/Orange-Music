import React from 'react';
import { isNotEmpty } from '../../../../../../util/empty';
import { EMPTY_IMG_SRC, getImageUrl } from '../../../../../../util/image';

const IMAGE_IDX = 2;

const ImageCell = (images) => {
  const imageSrc = isNotEmpty(images) ? getImageUrl(images, IMAGE_IDX) : EMPTY_IMG_SRC;

  let className = 'image-cell';
  if (imageSrc === EMPTY_IMG_SRC) { className += ' bordered'; }

  return (
    <div className={className}>
      <img src={imageSrc} />
      <div className='img-overlay'>
        <div className='play-icon-wrap'>
          <i className='material-icons play-icon'>play_circle_outline</i>
        </div>
      </div>
    </div>
  );
};

export default ImageCell;
