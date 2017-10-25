import React from 'react';
import { connect } from 'react-redux';
import NowPlayingComponent from './now_playing/now_playing';
import QUEUE_LIST_SCHEMA from '../shared/list/schemas/queue_schema';
import QUEUE_GALLERY_SCHEMA from '../shared/gallery/schemas/queue_schema';
import TableLayoutComponent from '../shared/table_layout/table_layout';


const TABLE_TYPES = Object.freeze({
  QUEUE: 0,
  HISTORY: 1,
});

let TABLES1 = {};
TABLES1[TABLE_TYPES.QUEUE] = {
  label: 'Queue',
  listSchema: QUEUE_LIST_SCHEMA,
  gallerySchema: QUEUE_GALLERY_SCHEMA,
};
TABLES1[TABLE_TYPES.HISTORY] = {
  label: 'History',
  listSchema: QUEUE_LIST_SCHEMA,
  gallerySchema: QUEUE_GALLERY_SCHEMA,
};
const TABLES = Object.freeze(TABLES1);


class QueueComponent extends React.Component {
  render() {
    const tables = Object.assign({}, TABLES);
    tables[TABLE_TYPES.QUEUE].entities = this.props.tracks.slice(1);
    tables[TABLE_TYPES.HISTORY].entities = []; // TODO

    return (
      <div className="queue">
        <TableLayoutComponent tables={tables}>
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
