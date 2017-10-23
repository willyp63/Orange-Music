import React from 'react';
import { isNotEmpty } from '../../../../util/empty';
import { EMPTY_IMG_SRC } from '../../../../util/image';
import { getImageUrl } from '../../../../api/last_fm/last_fm_api';

const IMAGE_IDX = 0;

const ImageCellComponent = (images) => (
  <div className='image-cell'>
    <img src={isNotEmpty(images)
                ? getImageUrl(images, IMAGE_IDX)
                : EMPTY_IMG_SRC} />
  </div>
);

export default ImageCellComponent;
