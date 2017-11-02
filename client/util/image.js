import { isNotEmpty } from './empty';

/// An empty, black square used as a backup image source.
export const EMPTY_IMG_SRC = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

export const getImageUrl = (images, preferredIdx) => {
  if (preferredIdx >= images.length) {
    preferredIdx = images.length - 1;
  }
  for (let i = preferredIdx; i >= 0; i--) {
    const url = images[i]['#text'];
    if (isNotEmpty(url)) { return url; }
  }
  return EMPTY_IMG_SRC;
};
