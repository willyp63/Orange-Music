import omApi from '../api/orange_music';
import validateCreatePlaylistForm from '../../../shared/validators/create_playlist';
import { setFieldErrors, clearForm, hideForm } from './form';
import { DISPLAY_TYPES } from '../../schemas/display';

const SET_DISPLAY_TYPE = 'orange-music/playlists/SET_DISPLAY_TYPE';

const REQUEST_PLAYLISTS = 'orange-music/playlists/REQUEST_PLAYLISTS';
const RECEIVE_PLAYLISTS = 'orange-music/playlists/RECEIVE_PLAYLISTS';

const CLEAR_PLAYLISTS = 'orange-music/playlists/CLEAR_PLAYLISTS';


const initialState = {
  displayType: DISPLAY_TYPES.GALLERY,
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

const formatTrackForApiRequest = track => ({
  name: track.name,
  artistName: track.artist.name,
  image: JSON.stringify(track.image),
});


export const setPlaylistsDisplayType = (displayType) => ({type: SET_DISPLAY_TYPE, displayType});

export const receivePlaylists = (playlists) => ({type: RECEIVE_PLAYLISTS, playlists});

export const clearPlaylists = () => ({type: CLEAR_PLAYLISTS});

export const fetchPlaylists = () => (dispatch, getState) => {
  const { session, playlists } = getState();
  const { token } = session;
  const { isFetching, fetched } = playlists.playlists;

  if (!token || isFetching || fetched) { return; }

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

export const createPlaylist = () => (dispatch, getState) => {
  const state = getState();
  const { name } = state.form.fields;
  const { token } = state.session;

  const formData = {name: name.value, token};
  const errors = validateCreatePlaylistForm(formData);
  dispatch(setFieldErrors('name', errors.name));

  if (errors.name.length === 0) {
    omApi.createPlaylist(formData).then(response => {
      if (response.errors) {
        dispatch(setFieldErrors('name', response.errors.name || []));
      } else {
        dispatch(refreshPlaylists());
        dispatch(hideForm());
        dispatch(clearForm());
      }
    });
  }
};

export const addTrackToPlaylist = () => (dispatch, getState) => {
  const state = getState();
  const { playlist, track } = state.form.fields;
  const { token } = state.session;

  const formData = {token, playlist: playlist.value, track: formatTrackForApiRequest(track.value)};

  omApi.addToPlaylist(formData).then(response => {
    if (response.errors) {
      dispatch(setFieldErrors('playlist', response.errors.playlist || []));
    } else {
      dispatch(hideForm());
      dispatch(clearForm());
    }
  });
};
