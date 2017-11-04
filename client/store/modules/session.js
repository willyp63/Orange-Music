import history from '../../history/history';
import omApi from '../api/orange_music';

const LOG_IN_USER = 'orange-music/session/LOG_IN_USER';
const LOG_OUT_USER = 'orange-music/session/LOG_OUT_USER';

const initialState = {
  user: {},
  token: '',
  loggedIn: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        user: action.user,
        token: action.token,
        loggedIn: true,
      };
    case LOG_OUT_USER:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export const logInUserFromLocalStorage = () => dispatch => {
  const token = sessionStorage.getItem('token');

  const redirectFromAccount = () => {
    if (history.location.pathname === '/account') {
      history.pushLocation('/signup');
    }
  };

  if (!token) { return redirectFromAccount(); }

  omApi.verify({token}).then(data => {
    if (data.success) {
      dispatch(logInUser(data.user, token));
    } else {
      redirectFromAccount();
    }
  });
};

export const logInUser = (user, token) => dispatch => {
  dispatch({type: LOG_IN_USER, user, token});
  sessionStorage.setItem('token', token);
};

export const logOutUser = () => dispatch => {
  dispatch({type: LOG_OUT_USER});
  sessionStorage.removeItem('token');
  history.pushLocation('/');
};
