import omApi from '../api/orange_music';
import history from '../../history/history';
import validate from '../../../shared/validators/sign_up';
import { logInUser } from './session';

const SET_NAME = 'orange-music/sign_up/SET_NAME';
const SET_PASSWORD = 'orange-music/sign_up/SET_PASSWORD';

const SET_NAME_ERRORS = 'orange-music/sign_up/SET_NAME_ERRORS';
const SET_PASSWORD_ERRORS = 'orange-music/sign_up/SET_PASSWORD_ERRORS';

const CLEAR_FORM = 'orange-music/sign_up/CLEAR_FORM';

const initialState = {
  name: '',
  password: '',
  errors: {
    name: [],
    password: [],
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case SET_NAME_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          name: action.errors,
        },
      };
    case SET_PASSWORD_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          password: action.errors,
        },
      };
    case CLEAR_FORM:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}


export const setName = name => ({type: SET_NAME, name});
export const setPassword = password => ({type: SET_PASSWORD, password});

const setNameErrors = errors => ({type: SET_NAME_ERRORS, errors});
const setPasswordErrors = errors => ({type: SET_PASSWORD_ERRORS, errors});

export const validateName = () => (dispatch, getState) => {
  const errors = validate({name: getState().signUp.name});
  dispatch(setNameErrors(errors.name));
};
export const validatePassword = () => (dispatch, getState) => {
  const errors = validate({password: getState().signUp.password});
  dispatch(setPasswordErrors(errors.password));
};

const clearForm = () => ({type: CLEAR_FORM});

export const submitForm = () => (dispatch, getState) => {
  dispatch(validateName());
  dispatch(validatePassword());

  const { name, password, errors } = getState().signUp;

  if (errors.name.length === 0 && errors.password.length === 0) {
    const user = {name, password};
    omApi.signUp(user).then(data => {
      if (data.errors) {
        dispatch(setNameErrors(data.errors.name || []));
        dispatch(setPasswordErrors(data.errors.password || []));
      } else {
        dispatch(logInUser(user, data.token));
        history.pushLocation('/');
        dispatch(clearForm());
      }
    });
  }
};
