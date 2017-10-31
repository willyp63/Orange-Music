import React from 'react';
import { connect } from 'react-redux';
import NowPlayingComponent from './now_playing/now_playing';
import QUEUE_TABLE_SCHEMAS, { QUEUE_TABLE_TYPES } from './queue_table_schemas';
import TableLayoutComponent from '../shared/table_layout/table_layout';

class QueueComponent extends React.Component {
  render() {
    const tableSchemas = Object.assign({}, QUEUE_TABLE_SCHEMAS);
    tableSchemas[QUEUE_TABLE_TYPES.QUEUE].entities = this.props.queue.slice(1);
    tableSchemas[QUEUE_TABLE_TYPES.QUEUE].emptyTable = (
      <div className="empty-table-msg">
        <span>To add a track to your queue, click the green plus icon (</span>
        <i className='material-icons'>add</i>
        <span>).</span>
      </div>
    );
    tableSchemas[QUEUE_TABLE_TYPES.HISTORY].entities = this.props.history;
    tableSchemas[QUEUE_TABLE_TYPES.HISTORY].emptyTable = (
      <div className='empty-table-msg'>
        After you listen to a track, it will show up here.
      </div>
    );

    return (
      <div className="queue">
        <TableLayoutComponent tableSchemas={tableSchemas}>
          <NowPlayingComponent track={this.props.queue[0]} />
        </TableLayoutComponent>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    queue: state.queue.queue,
    history: state.queue.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueueComponent);
