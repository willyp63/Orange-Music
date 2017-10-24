import React from 'react';
import { connect } from 'react-redux';
import ListComponent from '../../shared/list/list';
import ListHeaderComponent from '../../shared/list/list_header';
import QUEUE_LIST_SCHEMA from '../list_schema';

const NowPlayingComponent = ({tracks}) => {
  return (
    <div className='now-playing'>
      <div className='label'>
        Now Playing
      </div>
      <ListHeaderComponent schema={QUEUE_LIST_SCHEMA} />
      <ListComponent entities={tracks.slice(0, 1)}
                     schema={QUEUE_LIST_SCHEMA} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    tracks: state.queue.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowPlayingComponent);
