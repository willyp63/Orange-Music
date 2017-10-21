import orangeMusicApi from '../api/orange_music/orange_music_api';

/// Add Track
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

/// Remove Track
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

/// Clear
export const clearQueue = () => {
  return (dispatch) => {
    dispatch(clearQueueMsg());
  };
};

const clearQueueMsg = () => {
  return {type: CLEAR_QUEUE};
}
export const CLEAR_QUEUE = 'CLEAR_QUEUE';

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
      artistQuery: track.artist
    }).then((video) => {
      dispatch(receiveVideoForTrackMsg({track, video}));
    }, (err) => {
      console.log(`Error searching tracks: ${err}`);
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
