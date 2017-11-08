import React from 'react';
import { MatChip } from '../../../../material/index';

const PlaylistLinkChip = ({ text, className, actions, entity }) => {
  className += ' playlist-link-chip';
  className.trim();

  return (
    <MatChip className={className}
             text={text}
             onClick={() => { actions.goToPlaylist(entity.id); }} />
  );
};

export default PlaylistLinkChip;
