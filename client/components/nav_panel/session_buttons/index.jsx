import React from 'react';
import { connect } from 'react-redux';
import SIGN_UP_FROM_SCHEMA from '../../../schemas/form/sign_up';
import LOG_IN_FROM_SCHEMA from '../../../schemas/form/log_in';
import ACCOUNT_FROM_SCHEMA from '../../../schemas/form/account';
import { showFormWithSchema } from '../../../store/modules/form';
import { signUp, logIn, endSession } from '../../../store/modules/session';
import Button from 'material-ui/Button';
import classNames from 'classnames';

class SessionButtons extends React.PureComponent {
  render() {
    const { user, signUp, logIn, endSession, showFormWithSchema } = this.props;

    const onSignUp = () =>
      showFormWithSchema({...SIGN_UP_FROM_SCHEMA, submitAction: signUp});
    const onLogIn = () =>
      showFormWithSchema({...LOG_IN_FROM_SCHEMA, submitAction: logIn});
    const onAccount = () =>
      showFormWithSchema({...ACCOUNT_FROM_SCHEMA, submitAction: endSession});

    const className = classNames('session-btns', {'logged-in': !!user});

    return user
      ? (
        <div className={className}>
          <Button onClick={onAccount}>
            <i className='material-icons'>person</i>
            {user.name}
          </Button>
        </div>
      ) : (
        <div className={className}>
          <Button onClick={onLogIn}>
            LOG IN
          </Button>
          <div className="divider"></div>
          <Button onClick={onSignUp}>
            SIGN UP
          </Button>
        </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: () => dispatch(signUp()),
    logIn: () => dispatch(logIn()),
    endSession: () => dispatch(endSession()),
    showFormWithSchema: (schema) => dispatch(showFormWithSchema(schema)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionButtons);
