import React from 'react';
import history from '../../../../../history';
import { connect } from 'react-redux';
import { play, addToQueue, removeFromQueue, removeFromHistory, playPlaylist } from '../../../../../store/modules/queue';
import { signup, logInGuest } from '../../../../../store/modules/session';
import { showFormWithSchema, setFieldValue } from '../../../../../store/modules/form';
import { addTrackToPlaylist, deletePlaylist, removeTrackFromPlaylist, fetchPlaylists } from '../../../../../store/modules/playlists';
import ADD_TO_PLAYLIST_FORM_SCHEMA from '../../../../../schemas/form/add_to_playlist';
import SIGN_UP_FROM_SCHEMA from '../../../../../schemas/form/sign_up';


class ActionProvider extends React.Component {
  render() {
    const { play, addToQueue, removeFromQueue, removeFromHistory, children,
      showFormWithSchema, addTrackToPlaylist, setFieldValue, deletePlaylist,
      removeTrackFromPlaylist, playlists, fetchPlaylists, user, signup,
      logInGuest, playPlaylist } = this.props;

    const goToArtist = artistName => {
      history.pushLocation('/search', {q: artistName, tt: '0'});
    };

    const goToPlaylist = playlistId => {
      history.pushLocation('/playlists/tracks', {pi: playlistId});
    };

    const addToPlaylist = track => {
      if (!user) {
        showFormWithSchema(Object.assign({}, SIGN_UP_FROM_SCHEMA, {submitAction: signup, altAction: logInGuest}));
      } else {
        showFormWithSchema(Object.assign({}, ADD_TO_PLAYLIST_FORM_SCHEMA, {submitAction: addTrackToPlaylist}));
        setFieldValue('track', track);
        fetchPlaylists();
      }
    };

    const actions = { play, addToQueue, removeFromQueue, removeFromHistory,
      goToArtist, addToPlaylist, goToPlaylist, deletePlaylist, removeTrackFromPlaylist,
      playPlaylist };

    return React.cloneElement(children, {actions});
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: (track) => { dispatch(play(track)); },
    playPlaylist: (playlist) => { dispatch(playPlaylist(playlist)); },
    addToQueue: (track) => { dispatch(addToQueue(track)); },
    removeFromQueue: (track) => { dispatch(removeFromQueue(track)); },
    removeFromHistory: (track) => { dispatch(removeFromHistory(track)); },
    deletePlaylist: (playlist) => dispatch(deletePlaylist(playlist)),
    addTrackToPlaylist: () => dispatch(addTrackToPlaylist()),
    removeTrackFromPlaylist: (track) => dispatch(removeTrackFromPlaylist(track)),
    showFormWithSchema: (schema) => dispatch(showFormWithSchema(schema)),
    setFieldValue: (field, value) => dispatch(setFieldValue(field, value)),
    fetchPlaylists: () => dispatch(fetchPlaylists()),
    signup: () => dispatch(signup()),
    logInGuest: () => dispatch(logInGuest()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionProvider);
