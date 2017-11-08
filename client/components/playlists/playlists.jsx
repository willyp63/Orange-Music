import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TABLE_SCHEMA, { PLAYLISTS_TABLE_TYPES } from '../../schemas/table/playlists';
import TableLayout from '../shared/table_layout/table_layout';
import { MatButton } from '../material';
import { setPlaylistsDisplayType, fetchPlaylists, createPlaylist } from '../../store/modules/playlists';
import { showForm, setFormSchema } from '../../store/modules/form';

const createPlaylistFormSchema = {
  submitButtonText: 'Create Playlist!',
  fields: [
    {
      name: 'name',
      label: 'Name',
    },
  ],
};

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
    const { playlists, isFetching, displayType, setDisplayType, showForm, setFormSchema, createPlaylist } = this.props;

    const schema = Object.assign({}, TABLE_SCHEMA);

    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].entities = playlists;
    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].isFetching = isFetching;
    schema[PLAYLISTS_TABLE_TYPES.PLAYLISTS].emptyTable = (
      <div className="empty-table-msg">
        You have no playlists.
      </div>
    );

    const onNewPlaylist = () => {
      const schema = Object.assign({}, createPlaylistFormSchema);
      schema.submitAction = createPlaylist;
      setFormSchema(schema);
      showForm();
    };

    return (
      <div className="playlists">
        <TableLayout schema={schema}
                     tableType={PLAYLISTS_TABLE_TYPES.PLAYLISTS}
                     displayType={displayType}
                     onDisplayTypeChange={setDisplayType}>
          <MatButton text='New Playlist'
                     className='new-playlist-btn'
                     onClick={onNewPlaylist} />
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
    showForm: () => dispatch(showForm()),
    createPlaylist: () => dispatch(createPlaylist()),
    setFormSchema: (schema) => dispatch(setFormSchema(schema)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlists);
