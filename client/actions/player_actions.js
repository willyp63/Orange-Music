import orangeMusicApi from '../api/orange_music/orange_music_api';

export const playTrack = (track) => {
  return (dispatch) => {
    dispatch(clearPlayingTrack());

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

const clearPlayingTrack = () => {
  return {type: CLEAR_PLAYING_TRACK};
}
export const CLEAR_PLAYING_TRACK = 'CLEAR_PLAYING_TRACK'

const receiveTrackToPlay = ({track, video}) => {
  return {
    type: RECEIVE_TRACK_TO_PLAY,
    track,
    video
  };
}
export const RECEIVE_TRACK_TO_PLAY = 'RECEIVE_TRACK_TO_PLAY'
