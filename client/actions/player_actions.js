import orangeMusicApi from '../api/orange_music/orange_music_api';

export const playTrack = (track) => {
  return (dispatch) => {
    dispatch(prepareToPlayTrack(track));

    const query = {
      query: track.name,
      artistQuery: track.artist
    };

    return orangeMusicApi.getVideo(query).then((video) => {
      dispatch(receiveTrackToPlay({track, video}));
    }, (err) => {
      console.log(`Error searching tracks: ${err}`);
    });
  }
}

const prepareToPlayTrack = (track) => {
  return {
    type: PREPARE_TO_PLAY_TRACK,
    track
  };
}
export const PREPARE_TO_PLAY_TRACK = 'PREPARE_TO_PLAY_TRACK'

const receiveTrackToPlay = ({track, video}) => {
  return {
    type: RECEIVE_TRACK_TO_PLAY,
    track,
    video
  };
}
export const RECEIVE_TRACK_TO_PLAY = 'RECEIVE_TRACK_TO_PLAY'
