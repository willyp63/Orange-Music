import React from 'react';
import { connect } from 'react-redux';
import NowPlaying from './now_playing/now_playing';
import TABLE_LAYOUT_SCHEMA, { QUEUE_TABLE_TYPES } from '../../schemas/table_layout/queue';
import TableLayout from '../shared/table_layout';
import { setQueueTableType, setQueueDisplayType } from '../../store/modules/queue';

class Queue extends React.Component {
  render() {
    const { queue, history, tableType, displayType, setTableType,
      setDisplayType } = this.props;

    const schema = Object.assign({}, TABLE_LAYOUT_SCHEMA);

    schema[QUEUE_TABLE_TYPES.QUEUE].entities = queue.slice(1);
    schema[QUEUE_TABLE_TYPES.QUEUE].emptyTable = (
      <div className='empty-table-msg'>
        Your queue is empty.
      </div>
    );

    schema[QUEUE_TABLE_TYPES.HISTORY].entities = history;
    schema[QUEUE_TABLE_TYPES.HISTORY].emptyTable = (
      <div className='empty-table-msg'>
        You haven't listened to any tracks yet.
      </div>
    );

    return (
      <div className='queue'>
        <TableLayout schema={schema}
                     tableType={tableType}
                     onTableTypeChange={setTableType}
                     displayType={displayType}
                     onDisplayTypeChange={setDisplayType}>
          <NowPlaying track={this.props.queue[0]} />
        </TableLayout>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tableType: state.queue.tableType,
    displayType: state.queue.displayType,
    queue: state.queue.queue,
    history: state.queue.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTableType: (tableType) => { dispatch(setQueueTableType(tableType)); },
    setDisplayType: (displayType) => { dispatch(setQueueDisplayType(displayType)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);
