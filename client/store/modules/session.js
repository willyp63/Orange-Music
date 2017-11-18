import omApi from '../api/orange_music';
import validateSignUpForm from '../../../shared/validators/sign_up';
import { setFieldErrors, clearForm, hideForm, setFieldValue } from './form';
import { clearPlaylists } from './playlists';

const REQUEST_LOG_IN = 'orange-music/session/REQUEST_LOG_IN';
const RECIEVE_LOG_IN = 'orange-music/session/RECIEVE_LOG_IN';

const START_SESSION = 'orange-music/session/START_SESSION';
const END_SESSION = 'orange-music/session/END_SESSION';

const initialState = {
  user: null,
  token: null,
  isLoggingIn: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_LOG_IN:
      return {
        ...state,
        user: null,
        token: null,
        isLoggingIn: true,
      };
    case RECIEVE_LOG_IN:
      return {
        ...state,
        isLoggingIn: false,
      };
    case START_SESSION:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    case END_SESSION:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}


/// Sign Up
export const signUp = () => (dispatch, getState) => {
  const { fields, isValid } = getState().form;
  if (isValid) {
    const formData = {name: fields.name.value, password: fields.password.value};
    omApi.signUp(formData).then(response => {
      if (response.errors) {
        dispatch(setFieldErrors('name', response.errors.name || []));
        dispatch(setFieldErrors('password', response.errors.password || []));
      } else {
        dispatch(startSession(formData /* user */, response.token));
        dispatch(hideForm());
      }
    });
  }
};

/// Log In
export const logIn = () => (dispatch, getState) => {
  const { fields, isValid } = getState().form;
  if (isValid) {
    const formData = {name: fields.name.value, password: fields.password.value};
    omApi.logIn(formData).then(response => {
      if (response.errors) {
        dispatch(setFieldErrors('name', response.errors.name || []));
        dispatch(setFieldErrors('password', response.errors.password || []));
      } else {
        dispatch(startSession(formData /* user */, response.token));
        dispatch(hideForm());
      }
    });
  }
};

export const logInGuest = () => dispatch => {
  dispatch(setFieldValue('name', 'Guest'));
  dispatch(setFieldValue('password', 'ornery_for_oranges'));
  dispatch(logIn());
};

/// Session
const requestLogIn = () => ({type: REQUEST_LOG_IN});
const receiveLogIn = () => ({type: RECIEVE_LOG_IN});

export const startSessionFromLocalStorage = () => dispatch => {
  dispatch(requestLogIn());

  const token = sessionStorage.getItem('token');
  if (!token) {
    dispatch(receiveLogIn());
    return;
  }

  omApi.verify({token}).then(response => {
    if (response.success) {
      dispatch(startSession(response.user, token));
    }
    dispatch(receiveLogIn());
  });
};

export const startSession = (user, token) => dispatch => {
  dispatch({type: START_SESSION, user, token});
  sessionStorage.setItem('token', token);
};

export const endSession = () => dispatch => {
  dispatch({type: END_SESSION});
  dispatch(hideForm());
  dispatch(clearPlaylists());
  sessionStorage.removeItem('token');
};
