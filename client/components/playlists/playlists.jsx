import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TABLE_SCHEMA, { PLAYLISTS_TABLE_TYPES } from '../../schemas/table_layout/playlists';
import CREATE_PLAYLIST_FORM_SCHEMA from '../../schemas/form/create_playlist';
import TableLayout from '../shared/table_layout';
import Button from 'material-ui/Button';
import { setPlaylistsDisplayType, fetchPlaylists, createPlaylist } from '../../store/modules/playlists';
import { showFormWithSchema } from '../../store/modules/form';

class Playlists extends React.Component {
  constructor(props) {
    super(props);

    this._fetchPlaylists(props);
  }
  componentWillReceiveProps(newProps) {
    this._fetchPlaylists(newProps);
  }
  _fetchPlaylists(props) {
    if (props.user) { props.fetchPlaylists(); }
  }
  render() {
    const { playlists, isFetching, displayType, setDisplayType, showFormWithSchema, createPlaylist } = this.props;

    const schema = Object.assign({}, TABLE_SCHEMA);

    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].entities = playlists;
    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].isFetching = isFetching;
    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].emptyTable = (
      <div className="empty-table-msg">
        Click the button above to create a new playlist.
      </div>
    );

    const onNewPlaylist = () => {
      const schema = Object.assign({}, CREATE_PLAYLIST_FORM_SCHEMA);
      schema.submitAction = createPlaylist;
      showFormWithSchema(schema);
    };

    return (
      <div className="playlists">
        <TableLayout schema={schema}
                     tableType={PLAYLISTS_TABLE_TYPES.PLAYLISTS}
                     displayType={displayType}
                     onDisplayTypeChange={setDisplayType}>
          <Button className='new-playlist-btn'
                  raised={true}
                  onClick={onNewPlaylist}>
            NEW PLAYLIST
          </Button>
        </TableLayout>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playlists: state.playlists.playlists.playlists,
    isFetching: state.playlists.playlists.isFetching,
    displayType: state.playlists.displayType,
    user: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayType: (displayType) => { dispatch(setPlaylistsDisplayType(displayType)); },
    fetchPlaylists: () => { dispatch(fetchPlaylists()); },
    createPlaylist: () => dispatch(createPlaylist()),
    showFormWithSchema: (schema) => dispatch(showFormWithSchema(schema)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
