import { ADD_TRACK_TO_QUEUE, REMOVE_TRACK_FROM_QUEUE, CLEAR_QUEUE,
  RECEIVE_VIDEO_FOR_TRACK } from '../actions/queue_actions';

import { isNotEmpty } from '../util/empty';

const DEFAULT_STATE = Object.freeze({
  tracks: [],
  tracksMap: {}
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
      return Object.assign({}, prevState)
  }
};

const addTrack = (prevState, action) => {
  // Ensure mbid is unique
  let mbid = action.track.mbid;
  let i = 0;
  while (prevState.tracksMap[mbid]) {
    mbid = `${action.track.mbid}-${i++}`;
  }
  const track = Object.assign({}, action.track, {mbid});

  // Add to tracks.
  const tracks = prevState.tracks.slice();
  tracks.push(track);

  // Add to tracksMap.
  const tracksMap = Object.assign({}, prevState.tracksMap);
  tracksMap[mbid] = track;

  return Object.assign({}, prevState, {
    tracks,
    tracksMap
  });
};

const removeTrack = (prevState, action) => {
  let track = prevState.tracksMap[action.track.mbid];
  if (isNotEmpty(track)) {
    // Remove from tracks
    let tracks = prevState.tracks.slice();
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i] === track) {
        tracks.splice(i, 1);
        break;
      }
    }

    // Remove from tracksMap
    const tracksMap = Object.assign({}, prevState.tracksMap);
    tracksMap[action.track.mbid] = null;

    return Object.assign({}, prevState, {
      tracks,
      tracksMap
    });
  } else {
    return Object.assign({}, prevState);
  }
};

const receiveVideoForTrack = (prevState, action) => {
  let track = prevState.tracksMap[action.track.mbid];
  if (isNotEmpty(track)) {
    // Update tracks.
    let tracks = prevState.tracks.slice();
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i] === track) {
        tracks[i].video = action.video;
        break;
      }
    }

    // Update tracksMap.
    const tracksMap = Object.assign({}, prevState.tracksMap);
    tracksMap[action.track.mbid].video = action.video;

    return Object.assign({}, prevState, {
      tracks,
      tracksMap
    });
  } else {
    return Object.assign({}, prevState);
  }
};

export default queueReducer
