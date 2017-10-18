import React from 'react';
import { connect } from 'react-redux';

import Ripple from '../shared/ripple';

import { isNotEmpty } from '../../util/empty';
import { playTrack } from '../../actions/player_actions';

/// An empty, black square used as a backup image source.
const EMPTY_IMG_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICA'
    + 'MAAACahl6sAAAABlBMVEX///8AAABVwtN+AAAA5ElEQVR4nO3PAQ0AMBADoZ9/07NBmsMB90'
    + 'bcuwlFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNE'
    + 'U0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0RTRFNEU0S5ERH83EAx0VzRQTAAAAAE'
    + 'lFTkSuQmCC';

const TextCellComponent = (text) => (
  <div className="table-cell-text">
    {isNotEmpty(text) ? text.toString() : ''}
  </div>
);

const ImageCellComponent = (images) => (
  <img className="table-cell-image"
       src={isNotEmpty(images) ? images[0]['#text'] : EMPTY_IMG_SRC} />
);

const PlayButtomCellComponent = (_, {playTrack}) => (
  <div className="play-button-container">
    <Ripple>
      <button type="button"
              className="table-cell-play-button"
              onClick={playTrack}>
        <i className="fa fa-play"></i>
      </button>
    </Ripple>
  </div>
);

const SCHEMA = {
  image: {
    order: 0,
    label: null,
    width: 8,
    component: ImageCellComponent
  },
  name: {
    order: 1,
    label: 'Track',
    width: 42,
    component: TextCellComponent
  },
  artist: {
    order: 2,
    label: 'Artist',
    width: 42,
    component: TextCellComponent
  },
  '@play_button': {
    order: 3,
    label: null,
    width: 8,
    path: 'image',
    component: PlayButtomCellComponent
  }
};

class SearchResultsComponent extends React.Component {
  render() {
    const columnHeaders = Object.keys(SCHEMA).map((field) => (
      <div className="table-column-header"
           style={{flex: `0 0 ${SCHEMA[field].width}%`}}
           key={field}>
        {SCHEMA[field].label}
      </div>
    ));

    const rows = isNotEmpty(this.props.tracks)
      ? this.props.tracks.map((track) => {
        const columns = Object.keys(SCHEMA).map((field) => (
          <div className="table-cell"
               style={{flex: `0 0 ${SCHEMA[field].width}%`}}
               key={field}>
            {SCHEMA[field].component(track[field], {
              playTrack: () => this.props.playTrack(track)
            })}
          </div>
        ));
        return (
          <div className="table-row"
               key={track.mbid}>
            {columns}
          </div>
        );
      })
    : 'No results ...';

    return (
      <div className="search-results">
        <div className="table-header">
          {columnHeaders}
        </div>
        {rows}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.search.tracks
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    playTrack: (track) => {
      dispatch(playTrack(track));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsComponent);
