import React from 'react';
import { connect } from 'react-redux';
import history from '../../history/history';
import { MatButton } from '../material';
import { logOutUser } from '../../store/modules/session';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this._redirect = this._redirect.bind(this);

    this._redirect(props);
  }
  componentWillReceiveProps(newProps) {
    this._redirect(newProps);
  }
  _redirect(props) {
    const { loggedIn, isLoggingIn } = props || this.props;

    if (!loggedIn && !isLoggingIn) {
      history.pushLocation('/signup');
    }
  }
  render() {
    const { user, logOutUser } = this.props;
    return (
      <div className='account'>
        <div className='user-name-container'>
          <div className='user-name'>
            <i className="material-icons">person</i>
            {user.name}
          </div>
        </div>
        <div className='action-btns'>
          <MatButton text='Log Out!' onClick={logOutUser} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.user,
    loggedIn: state.session.loggedIn,
    isLoggingIn: state.session.isLoggingIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => { dispatch(logOutUser()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
