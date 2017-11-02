import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { play, addToQueue, removeFromQueue, removeFromHistory } from '../../../../store/modules/queue';

const ActionProvider = ({play, addToQueue, removeFromQueue, removeFromHistory,
    history, children}) => {

  const goToArtist = artistName => {
    history.pushLocation('/search', {q: artistName, tt: '0'});
  };

  const actions = {play, addToQueue, removeFromQueue, removeFromHistory,
    goToArtist};

  return (<div>{React.cloneElement(children, {actions})}</div>);
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: (track) => { dispatch(play(track)); },
    addToQueue: (track) => { dispatch(addToQueue(track)); },
    removeFromQueue: (track) => { dispatch(removeFromQueue(track)); },
    removeFromHistory: (track) => { dispatch(removeFromHistory(track)); },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionProvider));
