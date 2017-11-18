import React from 'react';
import classNames from 'classnames';
import { EMPTY_IMG_SRC } from '../../../../../../util/image';

const PlaylistImage = ({ imageSrcs, children, onMouseLeave, onClick }) => {
	while (imageSrcs.length < 4) { imageSrcs.push(EMPTY_IMG_SRC) };

	const $images = imageSrcs
	  .slice(0, 4)
	  .map(i => i || EMPTY_IMG_SRC)
	  .map((i, idx) => (<img src={i} key={i + idx} className={classNames({bordered: i === EMPTY_IMG_SRC})} />));

	return (
    <div className='playable-img playlist-img'>
      {$images}
      <div className='img-overlay' onMouseLeave={onMouseLeave} onClick={onClick}>
 		  	<div className='play-icon-wrap'>
		      <i className='material-icons play-icon'>play_circle_outline</i>
		    </div>
		    {children}
	    </div>
    </div>
	);
};

export default PlaylistImage;
