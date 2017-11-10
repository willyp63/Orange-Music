import React from 'react';
import { connect } from 'react-redux';
import SIGN_UP_FROM_SCHEMA from '../../schemas/form/sign_up';
import LOG_IN_FROM_SCHEMA from '../../schemas/form/log_in';
import ACCOUNT_FROM_SCHEMA from '../../schemas/form/account';
import { showFormWithSchame } from '../../store/modules/form';
import { signUp, logIn, endSession } from '../../store/modules/session';
import Button from 'material-ui/Button';

const SessionButtons = ({user, showFormWithSchame, signUp, logIn, endSession}) => {
  const onSignUp = () => {
    const schema = Object.assign({}, SIGN_UP_FROM_SCHEMA, {submitAction: signUp});
    showFormWithSchame(schema);
  };

  const onLogIn = () => {
    const schema = Object.assign({}, LOG_IN_FROM_SCHEMA, {submitAction: logIn});
    showFormWithSchame(schema);
  };

  const onAccount = () => {
    const schema = Object.assign({}, ACCOUNT_FROM_SCHEMA, {submitAction: endSession});
    showFormWithSchame(schema);
  };

  return user
    ? (
      <div className='session-btns logged-in'>
        <Button onClick={onAccount}>
          <i className='material-icons'>person</i>
          {user.name}
        </Button>
      </div>
    ) : (
      <div className='session-btns'>
        <Button onClick={onLogIn}>
          LOG IN
        </Button>
        <div className="divider"></div>
        <Button onClick={onSignUp}>
          SIGN UP
        </Button>
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
    showFormWithSchame: (schema) => dispatch(showFormWithSchame(schema)),
    signUp: () => dispatch(signUp()),
    logIn: () => dispatch(logIn()),
    endSession: () => dispatch(endSession()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionButtons);
