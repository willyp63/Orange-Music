import omApi from '../api/orange_music';
import history from '../../history/history';
import { logInUser } from './session';

const SET_NAME = 'orange-music/log_in/SET_NAME';
const SET_PASSWORD = 'orange-music/log_in/SET_PASSWORD';

const SET_FORM_ERRORS = 'orange-music/log_in/SET_FORM_ERRORS';

const CLEAR_FORM = 'orange-music/log_in/CLEAR_FORM';

const initialState = {
  name: '',
  password: '',
  errors: {
    form: [],
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
    case SET_FORM_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          form: action.errors,
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

const setFormErrors = errors => ({type: SET_FORM_ERRORS, errors});

const clearForm = () => ({type: CLEAR_FORM});

export const submitForm = () => (dispatch, getState) => {
  const { name, password } = getState().logIn;

  omApi.logIn({name, password}).then(data => {
    if (data.errors) {
      dispatch(setFormErrors(data.errors.form || []));
    } else {
      dispatch(logInUser({name, password}, data.token));
      history.pushLocation('/');
      dispatch(clearForm());
    }
  });
};
