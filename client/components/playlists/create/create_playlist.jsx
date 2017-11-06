import React from 'react';
import { connect } from 'react-redux';
import { MatInput, MatButton } from '../../material';
import { closeCreateModal } from '../../../store/modules/playlists';
import { setName, submitForm } from '../../../store/modules/create_playlist';

const CreatePlaylist = ({ name, errors, setName, submitForm, closeCreateModal }) => {
  let $nameErrors = errors.name.map(err => {
    return (<div className='err-msg' key={err}>{err}</div>);
  });
  if (errors.name.length === 0) {
    $nameErrors = (<div className='err-msg'></div>);
  }

  return (
    <div className="create-playlist">
      <div className="form">
        <MatInput value={name}
                  onValueChange={setName}
                  placeholder='Playlist Name'/>
                {$nameErrors}
        <MatButton text='Create Playlist!' onClick={submitForm} />
      </div>
      <MatButton icon='close' onClick={closeCreateModal} className='close-btn' />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.createPlaylist.name,
    errors: state.createPlaylist.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => { dispatch(setName(name)); },
    submitForm: () => { dispatch(submitForm()); },
    closeCreateModal: () => { dispatch(closeCreateModal()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePlaylist);
