import React from 'react';
import { isNotEmpty } from '../../../util/empty';

const IMAGE_IDX = 0;

/// An empty, black square used as a backup image source.
const EMPTY_IMG_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICA'
    + 'MAAACahl6sAAAABlBMVEX///8AAABVwtN+AAAA5ElEQVR4nO3PAQ0AMBADoZ9/07NBmsMB90'
    + 'bcuwlFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0S5ERH83EAx0VzRQTAAAAAE'
    + 'lFTkSuQmCC';

const ImageCellComponent = (images) => (
  <div className="image-cell">
    <img src={isNotEmpty(images) ? images[IMAGE_IDX]['#text'] : EMPTY_IMG_SRC} />
  </div>
);

export default ImageCellComponent;
