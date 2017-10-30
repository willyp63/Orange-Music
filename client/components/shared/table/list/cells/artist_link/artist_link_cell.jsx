import React from 'react';
import { isNotEmpty } from '../../../../../../util/empty';

const ArtistLinkCellComponent = (text, _, actions) => {
  return (
    <span className='artist-link-cell'
         onClick={() => { actions.pushUrl('/search/tracks', {q: text}); }}>
      {isNotEmpty(text) ? text.toString() : ''}
    </span>
  );
};

export default ArtistLinkCellComponent;
