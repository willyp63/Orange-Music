import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty, isEmpty } from '../../util/empty';
import { formatTimeMinutesSeconds } from '../../util/time';
import { EMPTY_IMG_SRC } from '../../util/image';

import { getImageUrl } from '../../api/last_fm/last_fm_api';

import Ripple from '../shared/ripple';
import ReactTooltip from 'simple-react-tooltip';
import SliderComponent from '../shared/slider';

import MyAudioPlayer from './my_audio_player';

const AUTO_PLAY = 'false';
const IMAGE_IDX = 2;
const DEFAULT_TEXT = '--';

const PROGRESS_BAR_CLASS_NAME = 'progress-bar';
const PROGRESS_BAR_HANDLE_SIZE = 8 * 2;

const VOLUME_BAR_CLASS_NAME = 'volume-bar';
const VOLUME_BAR_HANDLE_SIZE = 8 * 2;

class PlayerBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(getTrackState(props), {
      volume: MAX_VOLUME
    });
    this.audioPlayer = new MyAudioPlayer(AUDIO_PLAYER_ID, {
      onPlay: () => {
        this.setState({playing: true});
      },
      onPause: () => {
        this.setState({playing: false});
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
    this.state.playing
      ? this.audioPlayer.pause()
      : this.audioPlayer.play();
  }
  onCurrentTimeChange(currentTime) {
    this.setState({currentTime}, () => {
      this.audioPlayer.setCurrentTime(currentTime);
    });
  }
  onVolumeChange(volume) {
    this.setState({volume}, () => {
      this.audioPlayer.setVolume(volume);
    });
  }
  loadNewTrack(props) {
    this.setState(getTrackState(props || this.props), () => {
      this.audioPlayer.load();
    });
  }
  render() {
    const { playing, currentTime, duration, audioSrc, imageSrc,
              artistName, trackName, volume } = this.state;

    const playPauseButtonTooltip = playing ? 'Pause' : 'Play';
    const playPauseButtonIconClassName =
        'fa ' + (playing ? 'fa-pause' : 'fa-play');

    const currentTimeLabel = formatTimeMinutesSeconds(currentTime);
    const durationLabel = formatTimeMinutesSeconds(duration);

    return (
      <div className="player-bar">
        <div className="top-bar">
          <div className="track-info">
            <img src={imageSrc} />
            <div className="info-text">
              <div className="track-name">{trackName}</div>
              <div className="artist-name">{artistName}</div>
            </div>
          </div>
          <div className="track-controls">
            <div className="button-control prev-button">
              <Ripple isCircle={true}>
                <button data-tip="Previous Track">
                  <i className="fa fa-step-backward"></i>
                </button>
                <ReactTooltip effect={'solid'} />
              </Ripple>
            </div>
            <div className="button-control play-pause-button">
              <Ripple isCircle={true}>
                <button data-tip={playPauseButtonTooltip}
                        onClick={this.onPlayPauseButtonClick.bind(this)}>
                  <i className={playPauseButtonIconClassName}></i>
                </button>
                <ReactTooltip effect={'solid'} />
              </Ripple>
            </div>
            <div className="button-control next-button">
              <Ripple isCircle={true}>
                <button data-tip="Next Track">
                  <i className="fa fa-step-forward"></i>
                </button>
                <ReactTooltip effect={'solid'} />
              </Ripple>
            </div>
          </div>
          <div className="volume-controls">
            <i className="fa fa-volume-up"></i>
            <SliderComponent value={volume}
                             maxValue={MAX_VOLUME}
                             barClassName={VOLUME_BAR_CLASS_NAME}
                             handleSize={VOLUME_BAR_HANDLE_SIZE}
                             onValueChange={this.onVolumeChange.bind(this)}>
            </SliderComponent>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="time-label">{currentTimeLabel}</div>
          <SliderComponent value={currentTime}
                           maxValue={duration}
                           barClassName={PROGRESS_BAR_CLASS_NAME}
                           disabled={isEmpty(audioSrc)}
                           handleSize={PROGRESS_BAR_HANDLE_SIZE}
                           onValueChange={this.onCurrentTimeChange.bind(this)}>
          </SliderComponent>
          <div className="time-label">{durationLabel}</div>
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
    trackName: hasTrack ? props.track.name : DEFAULT_TEXT,
    artistName: hasTrack ? props.track.artist : DEFAULT_TEXT,
    imageSrc: hasTrack ? getImageUrl(props.track.image, IMAGE_IDX) : EMPTY_IMG_SRC,
    audioSrc: hasVideo ? props.video.stream.url : null,
    duration: hasVideo ? props.video.contentDetails.duration : 0,
    playing: false,
    currentTime: 0,
  };
}

const AUDIO_PLAYER_ID = 'audio-player';
const MAX_VOLUME = 1;

const mapStateToProps = (state) => {
  return {
    track: state.player.track,
    video: state.player.video
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBarComponent);
