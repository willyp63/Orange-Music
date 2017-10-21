import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty, isEmpty } from '../../util/empty';

import { getImageUrl } from '../../api/last_fm/last_fm_api';

import TrackInfoComponent from './track_info/track_info';
import TrackControlsComponent from './track_controls/track_controls';
import VolumeControlsComponent from './volume_controls/volume_controls';
import ProgressBarComponent from './progress_bar/progress_bar';

import AudioApi from './audio_api/audio_api';

const AUTO_PLAY = true;
const IMAGE_IDX = 2;

class PlayerBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(getTrackState(props), {
      volume: MAX_VOLUME
    });
    this.audioApi = new AudioApi(AUDIO_PLAYER_ID, {
      onPlay: () => {
        this.setState({isPlaying: true});
      },
      onPause: () => {
        this.setState({isPlaying: false});
      },
      onTimeUpdate: (currentTime) => {
        this.setState({currentTime});
      },
      onEnded: (e) => {
        this.loadNewTrack.bind(this)();
      }
    });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.track !== newProps.track ||
        this.props.video !== newProps.video) {
      this.loadNewTrack.bind(this, newProps)();
    }
  }
  onPlayPauseButtonClick() {
    this.state.isPlaying
      ? this.audioApi.pause()
      : this.audioApi.play();
  }
  onCurrentTimeChange(currentTime) {
    this.setState({currentTime}, () => {
      this.audioApi.setCurrentTime(currentTime);
    });
  }
  onVolumeButtonClick() {
    this.state.volume === 0
      ? this.setVolume.bind(this, MAX_VOLUME)()
      : this.setVolume.bind(this, 0)();
  }
  setVolume(volume) {
    this.setState({volume}, () => {
      this.audioApi.setVolume(volume);
    });
  }
  loadNewTrack(props) {
    this.setState(getTrackState(props || this.props), () => {
      this.audioApi.load();
    });
  }
  render() {
    const { isPlaying, currentTime, duration, audioSrc, imageSrc,
              artistName, trackName, volume } = this.state;

    return (
      <div className="player-bar">
        <div className="top-bar">
          <TrackInfoComponent trackName={trackName}
                              artistName={artistName}
                              imageSrc={imageSrc}>
          </TrackInfoComponent>
          <TrackControlsComponent isPlaying={isPlaying}
                                  isDisabled={isEmpty(audioSrc)}
                                  onPrev={() => {
                                    console.log('Prev');
                                  }}
                                  onPlayPause={this.onPlayPauseButtonClick.bind(this)}
                                  onNext={() => {
                                    console.log('Next');
                                  }}>
          </TrackControlsComponent>
          <VolumeControlsComponent volume={volume}
                                   maxVolume={MAX_VOLUME}
                                   onVolumeChange={this.setVolume.bind(this)}
                                   onVolumeButtonClick={this.onVolumeButtonClick.bind(this)}>
          </VolumeControlsComponent>
        </div>
        <div className="bottom-bar">
          <ProgressBarComponent currentTime={currentTime}
                                duration={duration}
                                isDisabled={isEmpty(audioSrc)}
                                onCurrentTimeChange={this.onCurrentTimeChange.bind(this)}>
          </ProgressBarComponent>
        </div>
        <audio id={AUDIO_PLAYER_ID} autoPlay={AUTO_PLAY}>
          <source src={audioSrc}/>
        </audio>
      </div>
    )
  }
}

const getTrackState = (props) => {
  const hasTrack = isNotEmpty(props.track);
  const hasVideo = isNotEmpty(props.video);
  return {
    trackName: hasTrack ? props.track.name : '',
    artistName: hasTrack ? props.track.artist : '',
    imageSrc: hasTrack ? getImageUrl(props.track.image, IMAGE_IDX) : '',
    audioSrc: hasVideo ? props.video.stream.url : null,
    duration: hasVideo ? props.video.contentDetails.duration : 0,
    isPlaying: false,
    currentTime: 0,
  };
}

const AUDIO_PLAYER_ID = 'audio-player';
const MAX_VOLUME = 1;

const mapStateToProps = (state) => {
  const track = state.queue.tracks[0];
  const video = isNotEmpty(track) ? track.video : null;
  return {track, video};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBarComponent);
