import React from 'react';
import { connect } from 'react-redux';
import NowPlayingComponent from './now_playing/now_playing';
import QUEUE_TABLE_SCHEMAS, { QUEUE_TABLE_TYPES } from './queue_table_schemas';
import TableLayoutComponent from '../shared/table_layout/table_layout';

class QueueComponent extends React.Component {
  render() {
    const tableSchemas = Object.assign({}, QUEUE_TABLE_SCHEMAS);
    tableSchemas[QUEUE_TABLE_TYPES.QUEUE].entities = this.props.queue.slice(1);
    tableSchemas[QUEUE_TABLE_TYPES.HISTORY].entities = this.props.history;

    const $nowPlaying = this.props.queue.length > 0
      ? (
        <div className="now-playing-container">
          <NowPlayingComponent track={this.props.queue[0]} />
        </div>
      ) : (
        <div className="info-msg">
          Add tracks to your queue by clicking the green plus icon
          <i className='material-icons'>add</i>
          .
        </div>
      );

    return (
      <div className="queue">
        <TableLayoutComponent tableSchemas={tableSchemas}>
          {$nowPlaying}
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
