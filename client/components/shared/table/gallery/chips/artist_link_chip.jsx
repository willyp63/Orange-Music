import React from 'react';
import { withRouter } from 'react-router';
import { getUrlWithUpdatedParams } from '../../../../../util/url';
import { MatChip } from '../../../../material/index';

const ArtistLinkChip = ({text, className, history, location}) => {
  className += ' artist-link-chip';
  className.trim();

  const onClick = () => {
    const { pathname, search } = location;
    const newUrl = getUrlWithUpdatedParams('/search/tracks' + search, {q: text});
    const oldUrl = pathname + search;
    if (newUrl !== oldUrl) { history.push(newUrl); }
  };

  return (
    <MatChip className={className} text={text} onClick={onClick} />
  );
};

export default withRouter(ArtistLinkChip);
