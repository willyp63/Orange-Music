import React from 'react';
import { isNotEmpty } from '../../../../../../util/empty';

const PlaylistLinkCell = (text, entity, actions) => {
  return (
    <span className='playlist-link-cell'
         onClick={() => { actions.goToPlaylist(entity.id); }}>
      {isNotEmpty(text) ? text.toString() : ''}
    </span>
  );
};

export default PlaylistLinkCell;
