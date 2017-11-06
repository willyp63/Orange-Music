import omApi from '../api/orange_music';
import validate from '../../../shared/validators/playlist';
import { closeCreateModal, refreshPlaylists } from './playlists';

const SET_NAME = 'orange-music/create_playlist/SET_NAME';
const SET_NAME_ERRORS = 'orange-music/create_playlist/SET_NAME_ERRORS';
const CLEAR_FORM = 'orange-music/create_playlist/CLEAR_FORM';

const initialState = {
  name: '',
  errors: {
    name: [],
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case SET_NAME_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          name: action.errors,
        },
      };
    case CLEAR_FORM:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}


export const setName = name => ({type: SET_NAME, name});

const setNameErrors = errors => ({type: SET_NAME_ERRORS, errors});

const clearForm = () => ({type: CLEAR_FORM});

export const validateName = () => (dispatch, getState) => {
  const errors = validate({name: getState().createPlaylist.name});
  dispatch(setNameErrors(errors.name));
};

export const submitForm = () => (dispatch, getState) => {
  dispatch(validateName());

  const state = getState();
  const { name, errors } = state.createPlaylist;
  const { token } = state.session;

  if (errors.name.length === 0) {
    omApi.createPlaylist({token, name}).then(data => {
      if (data.errors) {
        dispatch(setNameErrors(data.errors.name || []));
      } else {
        dispatch(refreshPlaylists());
        dispatch(closeCreateModal());
        dispatch(clearForm());
      }
    });
  }
};
