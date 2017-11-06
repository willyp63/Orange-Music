import history from '../../history/history';
import omApi from '../api/orange_music';
import { clearPlaylists } from './playlists';

const REQUEST_LOG_IN = 'orange-music/session/REQUEST_LOG_IN';
const RECIEVE_LOG_IN = 'orange-music/session/RECIEVE_LOG_IN';
const LOG_IN_USER = 'orange-music/session/LOG_IN_USER';

const LOG_OUT_USER = 'orange-music/session/LOG_OUT_USER';

const initialState = {
  user: {},
  token: '',
  loggedIn: false,
  isLoggingIn: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_LOG_IN:
      return {
        ...state,
        user: {},
        token: '',
        loggedIn: false,
        isLoggingIn: true,
      };
    case RECIEVE_LOG_IN:
      return {
        ...state,
        isLoggingIn: false,
      };
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

const requestLogIn = () => ({type: REQUEST_LOG_IN});
const receiveLogIn = () => ({type: RECIEVE_LOG_IN});

export const logInUserFromLocalStorage = () => dispatch => {
  const token = sessionStorage.getItem('token');
  if (!token) { return; }

  dispatch(requestLogIn());
  omApi.verify({token}).then(data => {
    if (data.success) {
      dispatch(logInUser(data.user, token));
    }
    dispatch(receiveLogIn());
  });
};

export const logInUser = (user, token) => dispatch => {
  dispatch({type: LOG_IN_USER, user, token});
  dispatch(clearPlaylists());
  sessionStorage.setItem('token', token);
};

export const logOutUser = () => dispatch => {
  dispatch({type: LOG_OUT_USER});
  sessionStorage.removeItem('token');
  history.pushLocation('/');
};
