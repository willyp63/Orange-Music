import React from 'react';
import { connect } from 'react-redux';
import { MatButton } from '../material';
import { showForm, setFormSchema } from '../../store/modules/form';
import { signUp, logIn, endSession } from '../../store/modules/session';

const signUpFormSchema = {
  submitButtonText: 'Sign Up!',
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

const logInFormSchema = {
  submitButtonText: 'Log In!',
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

const accountFormSchema = {
  submitButtonText: 'Log Out!',
  fields: [],
};

const SessionButtons = ({user, setFormSchema, showForm, signUp, logIn, endSession}) => {
  const onSignUp = () => {
    const schema = Object.assign({}, signUpFormSchema);
    schema.submitAction = signUp;
    setFormSchema(schema);
    showForm();
  };

  const onLogIn = () => {
    const schema = Object.assign({}, logInFormSchema);
    schema.submitAction = logIn;
    setFormSchema(schema);
    showForm();
  };

  const onAccount = () => {
    const schema = Object.assign({}, accountFormSchema);
    schema.submitAction = endSession;
    setFormSchema(schema);
    showForm();
  };

  return user
    ? (
      <div className='session-btns logged-in'>
        <MatButton text={user.name} icon='person' iconFirst={true} onClick={onAccount} />
      </div>
    ) : (
      <div className='session-btns'>
        <MatButton text='Log In' onClick={onLogIn} />
        <div className="divider"></div>
        <MatButton text='Sign Up' onClick={onSignUp} />
      </div>
    );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showForm: () => dispatch(showForm()),
    setFormSchema: (schema) => dispatch(setFormSchema(schema)),
    signUp: () => dispatch(signUp()),
    logIn: () => dispatch(logIn()),
    endSession: () => dispatch(endSession()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionButtons);
