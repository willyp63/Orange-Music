import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { isNotEmpty, isEmpty } from '../../util/empty';
import { EMPTY_IMG_SRC, getImageUrl } from '../../util/image';
import { removeFromQueue, popFromHistory } from '../../store/modules/queue';
import TrackInfo from './track_info/track_info';
import TrackControls from './track_controls/track_controls';
import VolumeControls from './volume_controls/volume_controls';
import ProgressBar from './progress_bar/progress_bar';
import AudioApi from './audio_api/audio_api';
import { TIME } from '../material';

const AUTO_PLAY = true;
const IMAGE_IDX = 2;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this._loadTrack = this._loadTrack.bind(this);
    this._killTrack = this._killTrack.bind(this);
    this._playNextTrack = this._playNextTrack.bind(this);
    this._setCurrentTime = this._setCurrentTime.bind(this);
    this._setVolume = this._setVolume.bind(this);
    this._onPlayPauseButtonClick = this._onPlayPauseButtonClick.bind(this);
    this._onPrevButtonClick = this._onPrevButtonClick.bind(this);
    this._onNextButtonClick = this._onNextButtonClick.bind(this);
    this._onVolumeButtonClick = this._onVolumeButtonClick.bind(this);
    this._updateAppLayout = this._updateAppLayout.bind(this);

    this.state = {
      isPlaying: false,
      isLoading: false,
      currentTime: 0,
      volume: MAX_VOLUME
    };

    this.audioApi = new AudioApi(AUDIO_PLAYER_ID, {
      onPlay: () => { this.setState({isPlaying: true}); },
      onPause: () => { this.setState({isPlaying: false}); },
      onTimeUpdate: (currentTime) => { this.setState({currentTime}); },
      onCanPlay: () => { this.setState({isLoading: false}); },
      onEnded: this._playNextTrack,
    });
  }
  componentWillReceiveProps(newProps) {
    isEmpty(newProps.track) || isEmpty(newProps.video)
      ? this._killTrack()
      : this._loadTrack();
  }
  componentWillUnmount() {
    this.audioApi.dispose();
  }
  componentDidMount() {
    this._updateAppLayout();
  }
  componentDidUpdate() {
    this._updateAppLayout();
  }
  _loadTrack() {
    this.setState({
      isPlaying: false,
      isLoading: true,
      currentTime: 0
    });
    this.audioApi.load();
  }
  _killTrack() {
    this.setState({
      isPlaying: false,
      isLoading: false,
      currentTime: 0
    });
    this.audioApi.pause();
  }
  _playNextTrack() {
    const { removeFromQueue, track } = this.props;

    this._killTrack();
    removeFromQueue(track);
  }
  _setCurrentTime(currentTime) {
    this.setState({currentTime});
    this.audioApi.setCurrentTime(currentTime);
  }
  _setVolume(volume) {
    this.setState({volume});
    this.audioApi.setVolume(volume);
  }
  _onPlayPauseButtonClick() {
    this.state.isPlaying
      ? this.audioApi.pause()
      : this.audioApi.play();
  }
  _onPrevButtonClick() {
    const { popFromHistory, history } = this.props;

    if (this.audioApi.currentTime() < 5.0 && history.length > 0) {
      popFromHistory();
    } else {
      this._setCurrentTime(0);
    }
  }
  _onNextButtonClick() {
    this._playNextTrack();
  }
  _onVolumeButtonClick() {
    this.state.volume === 0
      ? this._setVolume(MAX_VOLUME)
      : this._setVolume(0);
  }
  _updateAppLayout() {
    const $this = $(ReactDOM.findDOMNode(this));
    const $navPanel = $('.om-nav-panel');
    const $routeBg = $('.om-app .route-bg');
    const $route = $('.om-app .route');

    if (this.hidden) {
      $navPanel.css({marginBottom: 0});
      $routeBg.css({marginBottom: 0});
      $route.css({marginBottom: 0});
      $this.css({marginBottom: $this.outerHeight() * -1});
      setTimeout(() => $this.css({opacity: 0}), TIME);
    } else {
      $navPanel.css({marginBottom: $this.outerHeight()});
      $routeBg.css({marginBottom: $this.outerHeight()});
      $route.css({marginBottom: $this.outerHeight()});
      $this.css({marginBottom: 0, opacity: 1});
    }
  }
  render() {
    const {  duration, audioSrc, imageSrc, artistName, trackName, track } =
      this.props;
    const { isPlaying, currentTime, volume, isLoading } = this.state;

    const isDisabled = isEmpty(track) || isLoading;

    let className = 'om-player';
    this.hidden = isEmpty(track);
    if (this.hidden) { className += ' hidden'; }

    return (
      <div className={className}>
        <div className='bar-left'>
          <TrackInfo trackName={trackName}
                     artistName={artistName}
                     imageSrc={imageSrc} />
        </div>
        <div className='bar-center'>
          <div className='track-controls-wrap'>
            <TrackControls isPlaying={isPlaying}
                           isDisabled={isDisabled}
                           onPrev={this._onPrevButtonClick}
                           onPlayPause={this._onPlayPauseButtonClick}
                           onNext={this._onNextButtonClick} />
          </div>
          <ProgressBar currentTime={currentTime}
                       duration={duration}
                       isDisabled={isDisabled}
                       onCurrentTimeChange={this._setCurrentTime} />
        </div>
        <div className='bar-right'>
          <VolumeControls volume={volume}
                          maxVolume={MAX_VOLUME}
                          onVolumeChange={this._setVolume}
                          onVolumeButtonClick={this._onVolumeButtonClick} />
        </div>
        <audio id={AUDIO_PLAYER_ID} autoPlay={AUTO_PLAY}>
          <source src={audioSrc} />
        </audio>
      </div>
    )
  }
}

const AUDIO_PLAYER_ID = 'audio-player';
const MAX_VOLUME = 1;

const mapStateToProps = (state) => {
  const history = state.queue.history;
  const track = state.queue.queue[0];
  const video = isNotEmpty(track) ? track.video : null;

  const hasTrack = isNotEmpty(track);
  const hasVideo = isNotEmpty(video);
  return {
    trackName: hasTrack ? track.name : '',
    artistName: hasTrack ? track.artist.name : '',
    imageSrc: hasTrack ? getImageUrl(track.image, IMAGE_IDX) : EMPTY_IMG_SRC,
    audioSrc: hasVideo ? video.stream.url : null,
    duration: hasVideo ? video.contentDetails.duration : 0,
    track,
    video,
    history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideo: (track) => { dispatch(fetchVideo(track)); },
    removeFromQueue: (track) => { dispatch(removeFromQueue(track)); },
    popFromHistory: () => { dispatch(popFromHistory()); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
