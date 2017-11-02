import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getUrlWithUpdatedParams } from '../../../../util/url';
import FlexTable from './flex_table/flex_table';
import { play, addToQueue, removeFromQueue, removeFromHistory } from '../../../../store/modules/queue';

const List = ({entities, schema, play, addToQueue, removeFromQueue,
    removeFromHistory, history, location}) => {

  const pushUrl = (pathname, queryParams) => {
    const newUrl = getUrlWithUpdatedParams(pathname + location.search, queryParams);
    const oldUrl = location.pathname + location.search;
    if (newUrl !== oldUrl) { history.push(newUrl); }
  };

  const actions = {play, addToQueue, removeFromQueue, removeFromHistory, pushUrl};

  return (
    <FlexTable className={'om-list'}
               rowObjs={entities}
               keyPath={'mbid'}
               schema={schema}
               actions={actions} />
  )
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: (track) => {
      dispatch(play(track));
    },
    addToQueue: (track) => {
      dispatch(addToQueue(track));
    },
    removeFromQueue: (track) => {
      dispatch(removeFromQueue(track));
    },
    removeFromHistory: (track) => {
      dispatch(removeFromHistory(track));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(List));
