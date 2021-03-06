import omApi from '../api/orange_music';
import { QUEUE_TABLE_TYPES } from '../../schemas/table_layout/queue';
import { DISPLAY_TYPES } from '../../schemas/display_type';
import { concat, prepend } from './shared';


const SET_TABLE_TYPE = 'orange-music/queue/SET_TABLE_TYPE';
const SET_DISPLAY_TYPE = 'orange-music/queue/SET_DISPLAY_TYPE';

const ADD_TO_QUEUE = 'orange-music/queue/ADD_TO_QUEUE';
const ADD_TO_HEAD_OF_QUEUE = 'orange-music/queue/ADD_TO_HEAD_OF_QUEUE';
const REMOVE_FROM_QUEUE = 'orange-music/queue/REMOVE_FROM_QUEUE';
const CLEAR_QUEUE = 'orange-music/queue/CLEAR_QUEUE';
const FILL_QUEUE = 'orange-music/queue/FILL_QUEUE';

const ADD_TO_HISTORY = 'orange-music/queue/ADD_TO_HISTORY';
const REMOVE_FROM_HISTORY = 'orange-music/queue/REMOVE_FROM_HISTORY';

const RECEIVE_VIDEO = 'orange-music/queue/RECEIVE_VIDEO';


const initialState = {
  tableType: QUEUE_TABLE_TYPES.QUEUE,
  displayType: DISPLAY_TYPES.LIST,
  queue: [],
  history: [],
};

export default function reducer(state = initialState, action = {}) {
  let queue, history, i;
  switch (action.type) {
    case SET_TABLE_TYPE:
      return {
        ...state,
        tableType: action.tableType,
      };
    case SET_DISPLAY_TYPE:
      return {
        ...state,
        displayType: action.displayType,
      };
    case ADD_TO_QUEUE:
      return {
        ...state,
        queue: concat(state.queue, [Object.assign({}, action.track)])
      };
    case ADD_TO_HEAD_OF_QUEUE:
      return {
        ...state,
        queue: prepend(state.queue, [Object.assign({}, action.track)])
      };
    case REMOVE_FROM_QUEUE:
      queue = state.queue.slice();
      i = indexOf(queue, action.track);
      if (i >= 0) { queue.splice(i, 1); }
      return {
        ...state,
        queue,
      };
    case CLEAR_QUEUE:
      return {
        ...state,
        queue: [],
      };
    case FILL_QUEUE:
      return {
        ...state,
        queue: concat([], action.tracks.map(t => Object.assign({}, t))),
      };
    case RECEIVE_VIDEO:
      queue = state.queue.slice();
      i = indexOf(queue, action.track);
      if (i >= 0) { queue[i].video = action.video; }
      return {
        ...state,
        queue,
      };
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: prepend(state.history, [Object.assign({}, action.track)])
      };
    case REMOVE_FROM_HISTORY:
      history = state.history.slice();
      i = indexOf(history, action.track);
      if (i >= 0) { history.splice(i, 1); }
      return {
        ...state,
        history,
      };
    default:
      return state;
  }
}


export const setQueueTableType = tableType => ({type: SET_TABLE_TYPE, tableType});
export const setQueueDisplayType = displayType => ({type: SET_DISPLAY_TYPE, displayType});

export const addToQueue = track => dispatch => {
  dispatch({type: ADD_TO_QUEUE, track});
  dispatch(fetchVideoForPlayingTrack());
}

const addToHeadOfQueue = track => dispatch => {
  dispatch({type: ADD_TO_HEAD_OF_QUEUE, track});
  dispatch(fetchVideoForPlayingTrack());
}

const fillQueue = tracks => dispatch => {
  dispatch({type: FILL_QUEUE, tracks});
  dispatch(fetchVideoForPlayingTrack());
};

export const removeFromQueue = track => (dispatch, getState) => {
  // If this is the current playing song, add it to history.
  const { queue } = getState().queue;
  if (queue.length > 0 && queue[0].mbid === track.mbid) {
    dispatch(addToHistory(track));
  }

  dispatch({type: REMOVE_FROM_QUEUE, track});
  dispatch(fetchVideoForPlayingTrack());
};

const clearQueue = () => (dispatch, getState) => {
  const { queue } = getState().queue;
  if (queue.length > 0) { dispatch(addToHistory(queue[0])); }
  dispatch({type: CLEAR_QUEUE});
};

export const play = track => dispatch => {
  dispatch(clearQueue());
  dispatch(addToQueue(track));
};

export const playList = tracks => dispatch => {
  dispatch(clearQueue());
  dispatch(fillQueue(tracks));
};


export const playPlaylist = playlist => dispatch => {
  omApi.getPlaylistTracks({playlistId: playlist.id}).then((response) => {
    dispatch(playList(response.tracks));
  });
};

const fetchVideoForPlayingTrack = () => (dispatch, getState) => {
  const { queue } = getState().queue;
  if (queue.length > 0 && !queue[0].video) { dispatch(fetchVideo(queue[0])); }
};

const addToHistory = track => ({type: ADD_TO_HISTORY, track});
export const removeFromHistory = track => ({type: REMOVE_FROM_HISTORY, track});

export const popFromHistory = () => (dispatch, getState) => {
  const { queue } = getState();
  if (queue.history.length > 0) {
    dispatch(addToHeadOfQueue(queue.history[0]));
    dispatch(removeFromHistory(queue.history[0]));
  }
};

const fetchVideo = track => dispatch => {
  omApi.getVideo({
    query: track.name,
    artistQuery: track.artist.name
  }).then(video => {
    dispatch({type: RECEIVE_VIDEO, track, video});
  });
};

const indexOf = (tracks, track) => {
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].mbid === track.mbid) { return i; }
  }
  return -1;
};
