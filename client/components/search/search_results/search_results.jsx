import React from 'react';
import { connect } from 'react-redux';

import TABLE_SCHEMA from './search_results_schema';

import FlexTableComponent from '../../material/flex_table/flex_table';
import MatSpinnerComponent from '../../material/mat_spinner/mat_spinner';

import { isNotEmpty } from '../../../util/empty';
import { addTrackToQueue, playTrack } from '../../../actions/queue_actions';

const SearchResultsComponent = ({tracks, playTrack, addTrackToQueue, isFetching}) => {
  const tableActions = {playTrack, addTrackToQueue};

  const $emptyState = isFetching
    ? (
        <div className="search-results">
          <MatSpinnerComponent />
        </div>
      )
    : <div className="search-results"></div>;

  return isNotEmpty(tracks)
    ? (
      <FlexTableComponent tableClassName={'search-results'}
                          rowObjs={tracks}
                          keyPath={'mbid'}
                          schema={TABLE_SCHEMA}
                          actions={tableActions}>
      </FlexTableComponent>
    ) : $emptyState;
}

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.search.tracks,
    isFetching: state.search.isFetching
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    playTrack: (track) => {
      dispatch(playTrack(track));
    },
    addTrackToQueue: (track) => {
      dispatch(addTrackToQueue(track));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsComponent);
