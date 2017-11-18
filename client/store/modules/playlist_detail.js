import omApi from '../api/orange_music';
import { DISPLAY_TYPES } from '../../schemas/display_type';

const SET_DISPLAY_TYPE = 'orange-music/playlist_detail/SET_DISPLAY_TYPE';

const SET_PLAYLIST_ID = 'orange-music/playlist_detail/SET_PLAYLIST_ID';

const REQUEST_TRACKS = 'orange-music/playlist_detail/REQUEST_TRACKS';
const RECEIVE_TRACKS = 'orange-music/playlist_detail/RECEIVE_TRACKS';


const initialState = {
  displayType: DISPLAY_TYPES.GALLERY,
  playlistId: -1,
  tracks: {
    tracks: [],
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
    case SET_PLAYLIST_ID:
      return {
        ...state,
        playlistId: action.playlistId,
        tracks: Object.assign({}, initialState.tracks),
      };
    case REQUEST_TRACKS:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          tracks: [],
          fetched: false,
          isFetching: true,
        }
      };
    case RECEIVE_TRACKS:
      return {
        ...state,
        tracks: {
          ...state.tracks,
          tracks: action.tracks,
          fetched: true,
          isFetching: false,
        }
      };
    default:
      return state;
  }
}


export const setPlaylistDetailDisplayType = (displayType) => ({type: SET_DISPLAY_TYPE, displayType});

export const setPlaylistId = (playlistId) => ({type: SET_PLAYLIST_ID, playlistId});

export const fetchTracks = () => (dispatch, getState) => {
  const { session, playlistDetail } = getState();
  const { playlistId, tracks } = playlistDetail;
  const { isFetching, fetched } = tracks;

  if (playlistId === -1 || isFetching || fetched) { return; }

  dispatch({type: REQUEST_TRACKS});
  omApi.getPlaylistTracks({playlistId}).then((response) => {
    const tracks = response.tracks;
    dispatch(receiveTracks(tracks));
  });
};

export const refreshTracks = () => (dispatch, getState) => {
  dispatch(setPlaylistId(getState().playlistDetail.playlistId));
  dispatch(fetchTracks());
};

export const receiveTracks = (tracks) => ({type: RECEIVE_TRACKS, tracks});
