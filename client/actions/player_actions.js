export const playTrack = (track) => {
  return (dispatch) => dispatch({
    type: PLAY_TRACK,
    track
  });
}

export const PLAY_TRACK = 'PLAY_TRACK'
