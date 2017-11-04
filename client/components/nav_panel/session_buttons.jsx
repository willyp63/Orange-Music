import React from 'react';
import { connect } from 'react-redux';
import history from '../../history/history';
import { MatButton } from '../material';

const SessionButtons = ({user, loggedIn}) => {
  const logIn = () => history.pushLocation('/login');
  const signUp = () => history.pushLocation('/signup');
  const account = () => history.pushLocation('/account');

  return loggedIn
    ? (
      <div className='session-btns logged-in'>
        <MatButton text={user.name} icon='person' iconFirst={true} onClick={account} />
      </div>
    ) : (
      <div className='session-btns'>
        <MatButton text='Log In' onClick={logIn} />
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionButtons);
