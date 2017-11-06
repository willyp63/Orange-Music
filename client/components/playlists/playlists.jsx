import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import history from '../../history/history';
import TABLE_SCHEMA, { PLAYLISTS_TABLE_TYPES } from '../../schemas/table/playlists';
import TableLayout from '../shared/table_layout/table_layout';
import CreatePlaylist from './create/create_playlist';
import { MatButton, MatModal } from '../material';
import { setPlaylistsDisplayType, fetchPlaylists, openCreateModal } from '../../store/modules/playlists';

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this._redirectOrFetch = this._redirectOrFetch.bind(this);
    this._focusCreatePlaylistForm = this._focusCreatePlaylistForm.bind(this);

    this._redirectOrFetch(props);
  }
  componentWillReceiveProps(newProps) {
    this._redirectOrFetch(newProps);
  }
  _redirectOrFetch(props) {
    const { loggedIn, isLoggingIn, fetchPlaylists } = props || this.props;

    if (!isLoggingIn) {
      if (loggedIn) {
        fetchPlaylists();
      } else {
        history.pushLocation('/signup');
      }
    }
  }
  _focusCreatePlaylistForm() {
    $(ReactDOM.findDOMNode(this)).find('.create-playlist .mat-input input').focus();
  }
  render() {
    const { playlists, isFetching, displayType, setDisplayType, isCreateModalOpen, openCreateModal } = this.props;

    const schema = Object.assign({}, TABLE_SCHEMA);

    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].entities = playlists;
    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].isFetching = isFetching;
    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].emptyTable = (
      <div className="empty-table-msg">
        You have no playlists.
      </div>
    );

    return (
      <div className="playlists">
        <TableLayout schema={schema}
                     tableType={PLAYLISTS_TABLE_TYPES.PLAYLISTS}
                     displayType={displayType}
                     onDisplayTypeChange={setDisplayType}>
          <MatButton text='New Playlist'
                     className='new-playlist-btn'
                     onClick={() => {
                       openCreateModal();
                       this._focusCreatePlaylistForm();
                     }} />
        </TableLayout>
        <MatModal isOpen={isCreateModalOpen}>
          <CreatePlaylist />
        </MatModal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isCreateModalOpen: state.playlists.isCreateModalOpen,
    playlists: state.playlists.playlists.playlists,
    isFetching: state.playlists.playlists.isFetching,
    displayType: state.playlists.displayType,
    loggedIn: state.session.loggedIn,
    isLoggingIn: state.session.isLoggingIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayType: (displayType) => { dispatch(setPlaylistsDisplayType(displayType)); },
    fetchPlaylists: () => { dispatch(fetchPlaylists()); },
    openCreateModal: () => { dispatch(openCreateModal()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
