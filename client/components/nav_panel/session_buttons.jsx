import React from 'react';
import { connect } from 'react-redux';
import { MatButton } from '../material';
import { showForm, hideForm, setFormSchema } from '../../store/modules/form';

const signUpFormSchema = {
  submitButtonText: 'Sign Up!',
  submitAction: hideForm,
  fields: [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'password',
      label: 'Password',
    },
  ],
};

const SessionButtons = ({user, loggedIn, setFormSchema, showForm}) => {
  const signUp = () => {
    setFormSchema(signUpFormSchema);
    showForm();
  };

  return loggedIn
    ? (
      <div className='session-btns logged-in'>
        <MatButton text={user.name} icon='person' iconFirst={true} onClick={signUp} />
      </div>
    ) : (
      <div className='session-btns'>
        <MatButton text='Log In' onClick={signUp} />
        <div className="divider"></div>
        <MatButton text='Sign Up' onClick={signUp} />
      </div>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
    loggedIn: state.session.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showForm: () => dispatch(showForm()),
    setFormSchema: (schema) => dispatch(setFormSchema(schema)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionButtons);
