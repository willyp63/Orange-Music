import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getUrlWithUpdatedParams } from '../../../../util/url';
import FlexTableComponent from './flex_table/flex_table';
import { playTrack, addTrackToQueue, removeTrackFromQueue,
  removeTrackFromHistory } from '../../../../actions/queue_actions';

const ListComponent = ({entities, schema, playTrack, addTrackToQueue,
    removeTrackFromQueue, removeTrackFromHistory, history, location}) => {

  const pushUrl = (pathname, queryParams) => {
    const newUrl = getUrlWithUpdatedParams(pathname + location.search, queryParams);
    const oldUrl = location.pathname + location.search;
    if (newUrl !== oldUrl) { history.push(newUrl); }
  };

  const actions = {playTrack, addTrackToQueue, removeTrackFromQueue,
    removeTrackFromHistory, pushUrl};

  return (
    <FlexTableComponent className={'om-list'}
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
    playTrack: (track) => {
      dispatch(playTrack(track));
    },
    addTrackToQueue: (track) => {
      dispatch(addTrackToQueue(track));
    },
    removeTrackFromQueue: (track) => {
      dispatch(removeTrackFromQueue(track));
    },
    removeTrackFromHistory: (track) => {
      dispatch(removeTrackFromHistory(track));
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent));
