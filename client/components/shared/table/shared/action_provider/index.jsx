import React from 'react';
import history from '../../../../../history';
import { connect } from 'react-redux';
import { play, addToQueue, removeFromQueue, removeFromHistory } from '../../../../../store/modules/queue';
import { showFormWithSchema, setFieldValue } from '../../../../../store/modules/form';
import { addTrackToPlaylist, deletePlaylist, removeTrackFromPlaylist, fetchPlaylists } from '../../../../../store/modules/playlists';
import ADD_TO_PLAYLIST_FORM_SCHEMA from '../../../../../schemas/form/add_to_playlist';


class ActionProvider extends React.Component {
  render() {
    const { play, addToQueue, removeFromQueue, removeFromHistory, children,
      showFormWithSchema, addTrackToPlaylist, setFieldValue, deletePlaylist,
      removeTrackFromPlaylist, playlists, fetchPlaylists } = this.props;

    const goToArtist = artistName => {
      history.pushLocation('/search', {q: artistName, tt: '0'});
    };

    const goToPlaylist = playlistId => {
      history.pushLocation('/playlists/tracks', {pi: playlistId});
    };

    const addToPlaylist = track => {
      const schema = Object.assign({}, ADD_TO_PLAYLIST_FORM_SCHEMA);
      schema.submitAction = addTrackToPlaylist;
      showFormWithSchema(schema);
      setFieldValue('track', track);

      fetchPlaylists();
    };

    const actions = {play, addToQueue, removeFromQueue, removeFromHistory,
      goToArtist, addToPlaylist, goToPlaylist, deletePlaylist, removeTrackFromPlaylist};

    return React.cloneElement(children, {actions});
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: (track) => { dispatch(play(track)); },
    addToQueue: (track) => { dispatch(addToQueue(track)); },
    removeFromQueue: (track) => { dispatch(removeFromQueue(track)); },
    removeFromHistory: (track) => { dispatch(removeFromHistory(track)); },
    deletePlaylist: (playlist) => dispatch(deletePlaylist(playlist)),
    addTrackToPlaylist: () => dispatch(addTrackToPlaylist()),
    removeTrackFromPlaylist: (track) => dispatch(removeTrackFromPlaylist(track)),
    showFormWithSchema: (schema) => dispatch(showFormWithSchema(schema)),
    setFieldValue: (field, value) => dispatch(setFieldValue(field, value)),
    fetchPlaylists: () => dispatch(fetchPlaylists()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionProvider);
