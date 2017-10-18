import React from 'react';
import { connect } from 'react-redux';

import TextCellComponent from './cells/text_cell';
import ImageCellComponent from './cells/image_cell';
import ActionsCellComponent from './cells/actions_cell';

import { isNotEmpty } from '../../util/empty';
import { playTrack } from '../../actions/player_actions';

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
  '@actions': {
    order: 3,
    label: null,
    width: 8,
    component: ActionsCellComponent
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
