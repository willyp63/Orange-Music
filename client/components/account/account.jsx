import React from 'react';
import { connect } from 'react-redux';
import { MatButton } from '../material';
import { logOutUser } from '../../store/modules/session';

class Account extends React.Component {
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
