import React from 'react';
import classNames from 'classnames';
import { getImageUrl, EMPTY_IMG_SRC } from '../../../../../util/image';
import { UNIVERSAL_ACTION_TYPES } from '../../../../../schemas/action/universal';

const IMAGE_IDX = 2;

const PlayableImage = ({ imageIdx, entity, schema, actions, children, onMouseLeave }) => {
	const image = entity[schema.imagePath];
  const imageSrc = image ? getImageUrl(image, imageIdx || IMAGE_IDX) : EMPTY_IMG_SRC;

	const playAction = Object.keys(schema.actions).includes(UNIVERSAL_ACTION_TYPES.PLAY)
    ? actions[schema.actions[UNIVERSAL_ACTION_TYPES.PLAY].actionName].bind(null, entity)
    : null;

  const $imageOverlay = playAction
    ? (
 		  <div className='img-overlay' onMouseLeave={onMouseLeave}>
 		  	<div className='play-icon-wrap'>
		      <i className='material-icons play-icon'>play_circle_outline</i>
		    </div>
		    {children}
	    </div>
	  ) : null;

	return (
    <div className='playable-img' onClick={() => { if (playAction) { playAction(); } } }>
      <img src={imageSrc} className={classNames({bordered: imageSrc === EMPTY_IMG_SRC})} />
      {$imageOverlay}
    </div>
	);
};

export default PlayableImage;
