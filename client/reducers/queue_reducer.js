import { ADD_TRACK_TO_QUEUE, REMOVE_TRACK_FROM_QUEUE, CLEAR_QUEUE,
  RECEIVE_VIDEO_FOR_TRACK } from '../actions/queue_actions';

import { isNotEmpty } from '../util/empty';

const DEFAULT_STATE = Object.freeze({
  tracks: []
});

const queueReducer = (prevState = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_TRACK_TO_QUEUE:
      return addTrack(prevState, action);
    case REMOVE_TRACK_FROM_QUEUE:
      return removeTrack(prevState, action);
    case CLEAR_QUEUE:
      return Object.assign({}, DEFAULT_STATE);
    case RECEIVE_VIDEO_FOR_TRACK:
      return receiveVideoForTrack(prevState, action);
    default:
      return prevState
  }
};

const addTrack = (prevState, action) => {
  const tracks = prevState.tracks.slice();

  const takenIds = {};
  for (let i = 0; i < tracks.length; i++) {
    takenIds[tracks[i].mbid] = true;
  }

  let mbid = action.track.mbid;
  let i = 0;
  while (takenIds[mbid]) {
    mbid = `${action.track.mbid}#${i++}`;
  }

  tracks.push(Object.assign({}, action.track, {mbid}));
  return Object.assign({}, prevState, {tracks});
};

const removeTrack = (prevState, action) => {
  let tracks = prevState.tracks.slice();
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].mbid === action.track.mbid) {
      tracks.splice(i, 1);
      break;
    }
  }
  return Object.assign({}, prevState, {tracks});
};

const receiveVideoForTrack = (prevState, action) => {
  let tracks = prevState.tracks.slice();
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].mbid === action.track.mbid) {
      tracks[i].video = action.video;
      break;
    }
  }
  return Object.assign({}, prevState, {tracks});
};

export default queueReducer
