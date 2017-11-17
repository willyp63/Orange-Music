import React from 'react';
import { GRID } from '../../../../material';

const ListHeader = ({ schema }) => {
  const titleLabel = schema.titleLabel;
  const subtitleLabel = schema.subtitleLabel;

  return (
    <div className='om-list-header'>
      <div className='row'>
        <div className="img-cell"></div>
        <div className="title-cell" style={{flexBasis: subtitleLabel ? '50%' : '100%'}}>
          {titleLabel}
        </div>
        <div className="subtitle-cell" style={{flexBasis: subtitleLabel ? '50%' : '0', padding: subtitleLabel ? `(${GRID} / 2) ${GRID}` : 0}}>
          {subtitleLabel}
        </div>
        <div className="more-btn-cell"></div>
      </div>
    </div>
  );
};

export default ListHeader;
