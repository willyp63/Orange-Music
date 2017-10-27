import orangeMusicApi from '../api/orange_music/orange_music_api';

/// Add Track to Queue
export const addTrackToQueue = (track) => {
  return (dispatch) => {
    dispatch(addTrackToQueueMsg(track));
  };
};

const addTrackToQueueMsg = (track) => {
  return {
    type: ADD_TRACK_TO_QUEUE,
    track
  };
};
export const ADD_TRACK_TO_QUEUE = 'ADD_TRACK_TO_QUEUE';

/// Remove Track from Queue
export const removeTrackFromQueue = (track) => {
  return (dispatch) => {
    dispatch(removeTrackFromQueueMsg(track));
  };
};

const removeTrackFromQueueMsg = (track) => {
  return {
    type: REMOVE_TRACK_FROM_QUEUE,
    track
  };
};
export const REMOVE_TRACK_FROM_QUEUE = 'REMOVE_TRACK_FROM_QUEUE';

/// Clear Queue
export const clearQueue = () => {
  return (dispatch) => {
    dispatch(clearQueueMsg());
  };
};

const clearQueueMsg = () => {
  return {type: CLEAR_QUEUE};
}
export const CLEAR_QUEUE = 'CLEAR_QUEUE';

/// Add Track to History
export const addTrackToHistory = (track) => {
  return (dispatch) => {
    dispatch(addTrackToHistoryMsg(track));
  };
};

const addTrackToHistoryMsg = (track) => {
  return {
    type: ADD_TRACK_TO_HISTORY,
    track
  };
};
export const ADD_TRACK_TO_HISTORY = 'ADD_TRACK_TO_HISTORY';

/// Remove Track from History
export const removeTrackFromHistory = (track) => {
  return (dispatch) => {
    dispatch(removeTrackFromHistoryMsg(track));
  };
};

const removeTrackFromHistoryMsg = (track) => {
  return {
    type: REMOVE_TRACK_FROM_HISTORY,
    track
  };
};
export const REMOVE_TRACK_FROM_HISTORY = 'REMOVE_TRACK_FROM_HISTORY';

/// Pop Track from History
export const popTrackFromHistory = () => {
  return (dispatch) => { dispatch(popTrackFromHistoryMsg()); };
};

const popTrackFromHistoryMsg = () => {
  return {type: POP_TRACK_FROM_HISTORY};
};
export const POP_TRACK_FROM_HISTORY = 'POP_TRACK_FROM_HISTORY';

/// Play Track
export const playTrack = (track) => {
  return (dispatch) => {
    dispatch(clearQueueMsg());
    dispatch(addTrackToQueueMsg(track));
  }
}

/// Fetch video for track
export const fetchVideoForTrack = (track) => {
  return (dispatch) => {
    return orangeMusicApi.getVideo({
      query: track.name,
      artistQuery: track.artist.name
    }).then((video) => {
      dispatch(receiveVideoForTrackMsg({track, video}));
    });
  };
};

const receiveVideoForTrackMsg = ({track, video}) => {
  return {
    type: RECEIVE_VIDEO_FOR_TRACK,
    track,
    video
  };
}
export const RECEIVE_VIDEO_FOR_TRACK = 'RECEIVE_VIDEO_FOR_TRACK';
