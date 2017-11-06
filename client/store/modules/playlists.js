import omApi from '../api/orange_music';
import { DISPLAY_TYPES } from '../../schemas/display';


const SET_DISPLAY_TYPE = 'orange-music/playlists/SET_DISPLAY_TYPE';

const OPEN_CREATE_MODAL = 'orange-music/playlists/OPEN_CREATE_MODAL';
const CLOSE_CREATE_MODAL = 'orange-music/playlists/CLOSE_CREATE_MODAL';

const REQUEST_PLAYLISTS = 'orange-music/playlists/REQUEST_PLAYLISTS';
const RECEIVE_PLAYLISTS = 'orange-music/playlists/RECEIVE_PLAYLISTS';

const CLEAR_PLAYLISTS = 'orange-music/playlists/CLEAR_PLAYLISTS';


const initialState = {
  displayType: DISPLAY_TYPES.GALLERY,
  isCreateModalOpen: false,
  playlists: {
    playlists: [],
    isFetching: false,
    fetched: false,
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DISPLAY_TYPE:
      return {
        ...state,
        displayType: action.displayType,
      };
    case OPEN_CREATE_MODAL:
      return {
        ...state,
        isCreateModalOpen: true,
      };
    case CLOSE_CREATE_MODAL:
      return {
        ...state,
        isCreateModalOpen: false,
      };
    case REQUEST_PLAYLISTS:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          playlists: [],
          fetched: false,
          isFetching: true,
        }
      };
    case RECEIVE_PLAYLISTS:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          playlists: action.playlists,
          fetched: true,
          isFetching: false,
        }
      };
    case CLEAR_PLAYLISTS:
      return {
        ...state,
        playlists: Object.assign({}, initialState.playlists),
      };
    default:
      return state;
  }
}


export const setPlaylistsDisplayType = (displayType) => ({type: SET_DISPLAY_TYPE, displayType});

export const openCreateModal = () => ({type: OPEN_CREATE_MODAL});
export const closeCreateModal = () => ({type: CLOSE_CREATE_MODAL});

export const receivePlaylists = (playlists) => ({type: RECEIVE_PLAYLISTS, playlists});

export const clearPlaylists = () => ({type: CLEAR_PLAYLISTS});

export const fetchPlaylists = () => (dispatch, getState) => {
  const { session, playlists } = getState();
  const { token } = session;
  const { isFetching, fetched } = playlists.playlists;

  if (isFetching || fetched) { return; }

  dispatch({type: REQUEST_PLAYLISTS});
  omApi.getPlaylists({token}).then((response) => {
    const playlists = response.playlists;
    dispatch(receivePlaylists(playlists));
  });
};

export const refreshPlaylists = () => dispatch => {
  dispatch(clearPlaylists());
  dispatch(fetchPlaylists());
};
