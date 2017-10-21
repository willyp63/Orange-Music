import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty } from '../../../util/empty';

import { removeTrackFromQueue } from '../../../actions/queue_actions';

import FlexTableComponent from '../../shared/flex_table/flex_table';
import FlexTableHeaderComponent from '../../shared/flex_table/flex_table_header';

import TABLE_SCHEMA from '../queue_schema';

const NowPlayingTableComponent = ({tracks, removeTrackFromQueue}) => {
  const actions = {removeTrackFromQueue};

  const $table = isNotEmpty(tracks.slice(0, 1))
    ? (
      <FlexTableComponent rowObjs={tracks.slice(0, 1)}
                          schema={TABLE_SCHEMA}
                          keyPath={'mbid'}
                          actions={actions}>
      </FlexTableComponent>
    ) : (
      <div className='empty-state'>
        No track playing ...
      </div>
    );

  return (
    <div className="now-playing-table">
      <FlexTableHeaderComponent schema={TABLE_SCHEMA}>
      </FlexTableHeaderComponent>
      {$table}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.queue.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTrackFromQueue: (track) => {
      dispatch(removeTrackFromQueue(track));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowPlayingTableComponent);
