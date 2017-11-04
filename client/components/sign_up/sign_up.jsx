import React from 'react';
import { connect } from 'react-redux';
import { MatInput, MatButton } from '../material';
import { setName, setPassword, validateName, validatePassword, submitForm } from '../../store/modules/sign_up';

class SignUp extends React.Component {
  render() {
    const { name, password, errors, setName, setPassword, validateName, validatePassword, submitForm } = this.props;

    let $nameErrors = errors.name.map(err => {
      return (<div className='err-msg' key={err}>{err}</div>);
    });
    if (errors.name.length === 0) {
      $nameErrors = (<div className='err-msg'></div>);
    }

    let $passwordErrors = errors.password.map(err => {
      return (<div className='err-msg' key={err}>{err}</div>);
    });
    if (errors.password.length === 0) {
      $passwordErrors = (<div className='err-msg'></div>);
    }

    return (
      <div className="sign-up">
        <div className="form">
          <MatInput value={name}
                    onValueChange={setName}
                    placeholder='Username'/>
                  {$nameErrors}
          <MatInput value={password}
                    onValueChange={setPassword}
                    placeholder='Password'/>
                  {$passwordErrors}
                  <MatButton text='Sign Up!' onClick={submitForm} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.signUp.name,
    password: state.signUp.password,
    errors: state.signUp.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => { dispatch(setName(name)); },
    setPassword: (password) => { dispatch(setPassword(password)); },
    validateName: () => { dispatch(validateName()); },
    validatePassword: () => { dispatch(validatePassword()); },
    submitForm: () => { dispatch(submitForm()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
