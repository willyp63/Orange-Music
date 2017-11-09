import React from 'react';
import history from '../../../../history';
import { connect } from 'react-redux';
import { play, addToQueue, removeFromQueue, removeFromHistory } from '../../../../store/modules/queue';
import { showForm, setFormSchema, setFieldValue } from '../../../../store/modules/form';
import { fetchPlaylists, addTrackToPlaylist, deletePlaylist, removeTrackFromPlaylist } from '../../../../store/modules/playlists';

const addToPlaylistFormSchema = {
  title: 'Add to Playlist',
  fields: [
    {
      name: 'playlist',
      type: 'picker',
      formatter: (playlist) => playlist.name,
    },
    {
      name: 'track',
      isVisible: false,
    },
  ],
};

class ActionProvider extends React.Component {
  componentWillReceiveProps(newProps) {
    addToPlaylistFormSchema.fields[0].options = newProps.playlists;
    newProps.setFormSchema(addToPlaylistFormSchema);
  }
  render() {
    const { play, addToQueue, removeFromQueue, removeFromHistory, children, showForm,
      setFormSchema, playlists, fetchPlaylists, addTrackToPlaylist, setFieldValue,
      deletePlaylist, removeTrackFromPlaylist } = this.props;

    const goToArtist = artistName => {
      history.pushLocation('/search', {q: artistName, tt: '0'});
    };

    const goToPlaylist = playlistId => {
      history.pushLocation('/playlists/tracks', {pi: playlistId});
    };

    const addToPlaylist = track => {
      addToPlaylistFormSchema.fields[0].options = playlists;
      addToPlaylistFormSchema.fields[0].onValueChange = addTrackToPlaylist;
      fetchPlaylists(); // Incase we have not yet.
      setFormSchema(addToPlaylistFormSchema);
      setFieldValue('track', track);
      showForm();
    };


    const actions = {play, addToQueue, removeFromQueue, removeFromHistory,
      goToArtist, addToPlaylist, goToPlaylist, deletePlaylist, removeTrackFromPlaylist};

    return (<div>{React.cloneElement(children, {actions})}</div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playlists: state.playlists.playlists.playlists,
  };
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
    showForm: () => dispatch(showForm()),
    setFormSchema: (schema) => dispatch(setFormSchema(schema)),
    setFieldValue: (field, value) => dispatch(setFieldValue(field, value)),
    fetchPlaylists: () => dispatch(fetchPlaylists()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionProvider);
