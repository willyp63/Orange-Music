import React from 'react';
import { connect } from 'react-redux';
import { isNotEmpty, isEmpty } from '../../util/empty';
import { EMPTY_IMG_SRC } from '../../util/image';
import { getImageUrl } from '../../api/last_fm/last_fm_api';
import { fetchVideoForTrack, removeTrackFromQueue } from '../../actions/queue_actions';
import TrackInfoComponent from './track_info/track_info';
import TrackControlsComponent from './track_controls/track_controls';
import VolumeControlsComponent from './volume_controls/volume_controls';
import ProgressBarComponent from './progress_bar/progress_bar';
import AudioApi from './audio_api/audio_api';

const AUTO_PLAY = true;
const IMAGE_IDX = 2;

class PlayerComponent extends React.Component {
  constructor(props) {
    super(props);

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
      onEnded: () => { this.playNextTrack.bind(this)(); }
    });
  }
  componentWillReceiveProps(newProps) {
    if (isEmpty(newProps.track)) {
      this.killTrack.bind(this)();
    } else {
      if (isEmpty(newProps.video)) {
        // If we have a track but no video, then fetch the video.
        this.killTrack.bind(this, () => {
          this.setState({isLoading: true}, () => {
            newProps.fetchVideoForTrack(newProps.track);
          });
        })();
      } else {
        this.loadTrack.bind(this)();
      }
    }
  }
  componentWillUnmount() {
    this.audioApi.dispose();
  }
  loadTrack() {
    this.setState({
      isPlaying: false,
      isLoading: true,
      currentTime: 0
    }, () => {
      this.audioApi.load();
    });
  }
  killTrack(onStateSet) {
    this.setState({
      isPlaying: false,
      isLoading: false,
      currentTime: 0
    }, () => {
      this.audioApi.pause();
      if (typeof onStateSet === 'function') { onStateSet(); }
    });
  }
  playNextTrack() {
    this.killTrack.bind(this, () => {
      this.props.removeTrackFromQueue(this.props.track);
    })();
  }
  onPlayPauseButtonClick() {
    this.state.isPlaying
      ? this.audioApi.pause()
      : this.audioApi.play();
  }
  onPrevButtonClick() {
    this.setCurrentTime.bind(this, 0)();
  }
  onNextButtonClick() {
    this.playNextTrack.bind(this)();
  }
  setCurrentTime(currentTime) {
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
  render() {
    const {  duration, audioSrc, imageSrc, artistName, trackName, track } =
      this.props;
    const { isPlaying, currentTime, volume, isLoading } = this.state;

    const isDisabled = isEmpty(track) || isLoading;

    return (
      <div className="om-player">
        <div className="top-bar">
          <TrackInfoComponent trackName={trackName}
                              artistName={artistName}
                              imageSrc={imageSrc} />
          <TrackControlsComponent isPlaying={isPlaying}
                                  isDisabled={isDisabled}
                                  onPrev={this.onPrevButtonClick.bind(this)}
                                  onPlayPause={this.onPlayPauseButtonClick.bind(this)}
                                  onNext={this.onNextButtonClick.bind(this)} />
          <VolumeControlsComponent volume={volume}
                                   maxVolume={MAX_VOLUME}
                                   onVolumeChange={this.setVolume.bind(this)}
                                   onVolumeButtonClick={this.onVolumeButtonClick.bind(this)} />
        </div>
        <div className="bottom-bar">
          <ProgressBarComponent currentTime={currentTime}
                                duration={duration}
                                isDisabled={isDisabled}
                                onCurrentTimeChange={this.setCurrentTime.bind(this)}>
          </ProgressBarComponent>
        </div>
        <audio id={AUDIO_PLAYER_ID} autoPlay={AUTO_PLAY}>
          <source src={audioSrc}/>
        </audio>
      </div>
    )
  }
}

const AUDIO_PLAYER_ID = 'audio-player';
const MAX_VOLUME = 1;

const mapStateToProps = (state) => {
  const track = state.queue.tracks[0];
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
    video
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideoForTrack: (track) => {
      dispatch(fetchVideoForTrack(track));
    },
    removeTrackFromQueue: (track) => {
      dispatch(removeTrackFromQueue(track));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerComponent);
