import React from 'react';
import { connect } from 'react-redux';
import NowPlayingComponent from './now_playing/now_playing';
import QUEUE_TABLE_SCHEMA, { QUEUE_TABLE_TYPES } from './queue_table_schema';
import TableLayoutComponent from '../shared/table_layout/table_layout';

class QueueComponent extends React.Component {
  render() {
    const tableSchema = Object.assign({}, QUEUE_TABLE_SCHEMA);
    tableSchema[QUEUE_TABLE_TYPES.QUEUE].entities = this.props.tracks.slice(1);
    tableSchema[QUEUE_TABLE_TYPES.HISTORY].entities = []; // TODO: track queue histroy

    return (
      <div className="queue">
        <TableLayoutComponent tableSchema={tableSchema}>
          <div className="now-playing-container">
            <NowPlayingComponent />
          </div>
        </TableLayoutComponent>
      </div>
    );
  }
}

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
)(QueueComponent);
