import React from 'react';
import classNames from 'classnames';
import { EMPTY_IMG_SRC } from '../../../../../util/image';

const PlayableImage = ({ imageSrc, children, onMouseLeave, onClick }) => {
	return (
    <div className='playable-img'>
      <img src={imageSrc} className={classNames({bordered: !imageSrc || imageSrc === EMPTY_IMG_SRC})} />
      <div className='img-overlay' onMouseLeave={onMouseLeave} onClick={onClick}>
 		  	<div className='play-icon-wrap'>
		      <i className='material-icons play-icon'>play_circle_outline</i>
		    </div>
		    {children}
	    </div>
    </div>
	);
};

export default PlayableImage;
