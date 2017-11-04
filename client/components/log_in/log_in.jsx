import React from 'react';
import { connect } from 'react-redux';
import { MatInput, MatButton } from '../material';
import { setName, setPassword, submitForm } from '../../store/modules/log_in';

class Login extends React.Component {
  render() {
    const { name, password, errors, setName, setPassword, submitForm } = this.props;

    let $formErrors = errors.form.map(err => {
      return (<div className='err-msg' key={err}>{err}</div>);
    });
    if (errors.form.length === 0) {
      $formErrors = (<div className='err-msg'></div>);
    }

    return (
      <div className="log-in">
        <div className="form">
          <MatInput value={name}
                    onValueChange={setName}
                    placeholder='Username'/>
                  <div className='err-msg'></div>
          <MatInput value={password}
                    onValueChange={setPassword}
                    placeholder='Password'/>
                  {$formErrors}
                  <MatButton text='Log In!' onClick={submitForm} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.logIn.name,
    password: state.logIn.password,
    errors: state.logIn.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => { dispatch(setName(name)); },
    setPassword: (password) => { dispatch(setPassword(password)); },
    submitForm: () => { dispatch(submitForm()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
