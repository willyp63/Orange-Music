import React from 'react';
import Ripple from '../../shared/ripple';
import ReactTooltip from 'simple-react-tooltip'

const ActionsCellComponent = (_, {playTrack}) => (
  <div className="actions-cell">
    <div className="action-button play-button">
      <Ripple>
        <button data-tip="Play"
                onClick={playTrack}>
          <i className="fa fa-play"></i>
        </button>
        <ReactTooltip effect={'solid'} />
      </Ripple>
    </div>
    <div className="action-button add-button">
      <Ripple>
        <button data-tip="Add to Queue">
          <i className="fa fa-plus"></i>
        </button>
        <ReactTooltip effect={'solid'} />
      </Ripple>
    </div>
  </div>
);

export default ActionsCellComponent;
