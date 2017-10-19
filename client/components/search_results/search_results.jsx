import React from 'react';
import { connect } from 'react-redux';

import TABLE_SCHEMA from './search_results_schema';

import { isNotEmpty } from '../../util/empty';
import { playTrack } from '../../actions/player_actions';

const SearchResultsComponent = ({tracks, playTrack}) => {
  const rows = isNotEmpty(tracks)
    ? getRows(tracks, {playTrack})
    : 'No results ...';
  return (
    <div className="search-results">
      {rows}
    </div>
  );
}

const getRows = (tracks, {playTrack}) => {
  return tracks.map((track) => (
    <div className="row" key={track.mbid}>
      {getColumns(track, {playTrack})}
    </div>
  ));
}

const getColumns = (track, {playTrack}) => {
  return Object.keys(TABLE_SCHEMA).map((field) => {
    const columnStyle = {
      flex: `0 1 ${TABLE_SCHEMA[field].width}%`
    };
    const renderedComponent = TABLE_SCHEMA[field].component(track[field], {
      playTrack: () => playTrack(track)
    });
    return (
      <div style={columnStyle} key={field}>
        {renderedComponent}
      </div>
    )
  });
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
