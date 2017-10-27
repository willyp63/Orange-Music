import { ADD_TRACK_TO_QUEUE, REMOVE_TRACK_FROM_QUEUE, CLEAR_QUEUE,
  RECEIVE_VIDEO_FOR_TRACK, ADD_TRACK_TO_HISTORY, REMOVE_TRACK_FROM_HISTORY,
  POP_TRACK_FROM_HISTORY } from '../actions/queue_actions';
import { concatEntities, reduce } from './shared';

import { isNotEmpty } from '../util/empty';

const DEFAULT_STATE = {
  queue: [],
  history: [],
};

const queueReducer = (prevState = DEFAULT_STATE, action) => {
  let queue, history, i;
  switch (action.type) {
    case ADD_TRACK_TO_QUEUE:
      queue = concatEntities(prevState.queue, [Object.assign({}, action.track)]);
      return reduce(prevState, {queue});
    case REMOVE_TRACK_FROM_QUEUE:
      queue = prevState.queue.slice();
      i = indexOf(queue, action.track);
      queue.splice(i, 1);

      // Add track to history if it was at the head of the queue.
      if (i === 0) {
        history = concatEntities(prevState.history, [action.track], true);
      } else {
        history = prevState.history;
      }

      return reduce(prevState, {queue, history});
    case CLEAR_QUEUE:
      // If there are any tracks in the queue add the first to history
      if (prevState.queue.length > 0) {
        history = prevState.history.slice();
        history.unshift(prevState.queue[0]);
      } else {
        history = prevState.history;
      }
      return reduce(prevState, {queue: [], history});
    case ADD_TRACK_TO_HISTORY:
      history = concatEntities([Object.assign({}, action.track)], prevState.history);
      return reduce(prevState, {history});
    case REMOVE_TRACK_FROM_HISTORY:
      history = prevState.history.slice();
      i = indexOf(history, action.track);
      history.splice(i, 1);
      return reduce(prevState, {history});
    case POP_TRACK_FROM_HISTORY:
      history = prevState.history.slice();
      queue = prevState.queue.slice();
      if (history.length > 0) {
        queue.unshift(history.shift());
      }
      return reduce(prevState, {history, queue});
    case RECEIVE_VIDEO_FOR_TRACK:
      queue = prevState.queue.slice();
      i = indexOf(queue, action.track);
      if (i >= 0) { queue[i].video = action.video; }
      return reduce(prevState, {queue});
    default:
      return prevState
  }
};

const indexOf = (tracks, track) => {
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].mbid === track.mbid) {
      return i;
    }
  }
  return -1;
};

export default queueReducer
