import React from 'react';
import { isNotEmpty } from '../../../../../../util/empty';

const ArtistLinkCell = (text, _, actions) => {
  return (
    <span className='artist-link-cell'
         onClick={() => { actions.goToArtist(text); }}>
      {isNotEmpty(text) ? text.toString() : ''}
    </span>
  );
};

export default ArtistLinkCell;
