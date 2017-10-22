import React from 'react';

import { isNotEmpty } from '../../../util/empty';
import { EMPTY_IMG_SRC } from '../../../util/image';
import { getImageUrl } from '../../../api/last_fm/last_fm_api';

import MatButtonComponent from '../../shared/mat_button/mat_button';
import { blue, blue_darken_1, green, green_darken_1 } from '../../shared/mat_color/mat_color';

const IMAGE_IDX = 2;

const TopTrackGalleryItemComponent = (track, actions) => {
  const imageSrc = isNotEmpty(track) ? getImageUrl(track.image, IMAGE_IDX) : EMPTY_IMG_SRC;
  return (
    <div className="top-track-item">
      {isNotEmpty(imageSrc) ? (<img src={imageSrc} />) : ''}
      <div className="track-name">
        {isNotEmpty(track.name) ? track.name : '--'}
      </div>
      <div className="artist-name">
        {isNotEmpty(track.artist.name) ? track.artist.name : '--'}
      </div>
      <div className="action-btns">
        <MatButtonComponent buttonClassName={'action-btn play-btn'}
                   wrapClassName={'action-btn-wrap'}
                   icon={'play'}
                   isCircle={true}
                   bgColor={blue_darken_1}
                   bgColorHover={blue}
                   onClick={() => actions.playTrack(track)}>
        </MatButtonComponent>
        <MatButtonComponent buttonClassName={'action-btn add-btn'}
                   wrapClassName={'action-btn-wrap'}
                   icon={'plus'}
                   tooltip={'add to queue'}
                   isCircle={true}
                   bgColor={green_darken_1}
                   bgColorHover={green}
                   onClick={() => actions.addTrackToQueue(track)}>
        </MatButtonComponent>
      </div>
    </div>
  )
}

export default TopTrackGalleryItemComponent;
