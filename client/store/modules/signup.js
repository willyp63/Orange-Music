import omApi from '../api/orange_music';
import history from '../../history/history';
import validate from '../../../shared/validators/signup';

const SET_NAME = 'orange-music/signup/SET_NAME';
const SET_PASSWORD = 'orange-music/signup/SET_PASSWORD';

const SET_NAME_ERRORS = 'orange-music/signup/SET_NAME_ERRORS';
const SET_PASSWORD_ERRORS = 'orange-music/signup/SET_PASSWORD_ERRORS';

const SUBMIT_FORM = 'orange-music/signup/SUBMIT_FORM';

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
    default:
      return state;
  }
}


export const setName = name => ({type: SET_NAME, name});
export const setPassword = password => ({type: SET_PASSWORD, password});

const setNameErrors = errors => ({type: SET_NAME_ERRORS, errors});
const setPasswordErrors = errors => ({type: SET_PASSWORD_ERRORS, errors});

export const validateName = () => (dispatch, getState) => {
  const errors = validate({name: getState().signup.name});
  dispatch(setNameErrors(errors.name));
};
export const validatePassword = () => (dispatch, getState) => {
  const errors = validate({password: getState().signup.password});
  dispatch(setPasswordErrors(errors.password));
};

export const submitForm = () => (dispatch, getState) => {
  dispatch(validateName());
  dispatch(validatePassword());

  const { name, password, errors } = getState().signup;

  if (errors.name.length === 0 && errors.password.length === 0) {
    omApi.signup({name, password}).then(data => {
      if (data.formErrors) {
        dispatch(setNameErrors(data.formErrors.name || []));
        dispatch(setPasswordErrors(data.formErrors.password || []));
      } else {
        history.pushLocation('/');
      }
    });
  }
};
