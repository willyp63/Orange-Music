import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty } from '../../util/empty';
import { playTrack } from '../../actions/player_actions';

class SearchResultsComponent extends React.Component {
  render() {
    const results = isNotEmpty(this.props.tracks)
      ? this.props.tracks.map((track) => (
          <div key={track.mbid}
               onClick={() => this.props.playTrack(track)}>
            {track.name} @ {track.artist}
          </div>
        ))
      : 'No search results.';
    return (
      <div>
        {results}
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
