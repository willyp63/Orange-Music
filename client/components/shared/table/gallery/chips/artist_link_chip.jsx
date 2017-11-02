import React from 'react';
import { MatChip } from '../../../../material/index';

const ArtistLinkChip = ({ text, className, actions }) => {
  className += ' artist-link-chip';
  className.trim();

  return (
    <MatChip className={className}
             text={text}
             onClick={() => { actions.goToArtist(text); }} />
  );
};

export default ArtistLinkChip;
