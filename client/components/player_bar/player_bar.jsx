import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty } from '../../util/empty';
import { getUrlWithUpdatedParams } from '../../util/url';
import { formatTimeMinutesSeconds } from '../../util/time';
import MyAudioPlayer from './my_audio_player';
import { EMPTY_IMG_SRC } from '../../util/image';
import { getImageUrl } from '../../api/last_fm/last_fm_api';
import Ripple from '../shared/ripple';
import ReactTooltip from 'simple-react-tooltip';

const AUTO_PLAY = 'true';

const STREAM_BASE_URL = '/stream';

const AUDIO_PLAYER_ID = 'audio-player';

class PlayerBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.getTrackState.bind(this, props)(), {
      playing: false,
      currentTime: null
    });
    this.audioPlayer = new MyAudioPlayer(AUDIO_PLAYER_ID, {
      onPlay: () => {
        this.setState({playing: true});
      },
      onPause: () => {
        this.setState({playing: false});
      },
      onTimeUpdate: (currentTime) => {
        this.setState({currentTime: currentTime});
      },
      onEnded: () => {
        console.log('The song ended!');
      }
    });
  }
  getTrackState(props) {
    const hasTrack = isNotEmpty(props.track);
    return {
      trackName: hasTrack ? props.track.name : '--',
      artistName: hasTrack ? props.track.artist : '--',
      imageSrc: hasTrack ? getImageUrl(props.track.image, 2) : EMPTY_IMG_SRC,
      audioSrc: hasTrack ? getUrlWithUpdatedParams(STREAM_BASE_URL, {
          q: props.track.name,
          aq: props.track.artist
        }) : ''
    };
  }
  loadNewTrack(props) {
    const hasTrack = isNotEmpty(props.track);
    this.setState(this.getTrackState.bind(this, props)(), () => {
      this.audioPlayer.load();
    });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.track !== newProps.track) {
      this.loadNewTrack.bind(this, newProps)();
    }
  }
  render() {
    return (
      <div className="player-bar">
        <div className="top-bar">
          <div className="track-info">
            <img src={this.state.imageSrc} />
            <div className="info-text">
              <div className="track-name">{this.state.trackName}</div>
              <div className="artist-name">{this.state.artistName}</div>
            </div>
          </div>
          <div className="track-controls">
            <div className="button-control prev-button">
              <Ripple isCircle={true}>
                <button data-tip="Play">
                  <i className="fa fa-step-backward"></i>
                </button>
                <ReactTooltip effect={'solid'} />
              </Ripple>
            </div>
            <div className="button-control play-pause-button">
              <Ripple isCircle={true}>
                <button data-tip="Play">
                  <i className="fa fa-play"></i>
                </button>
                <ReactTooltip effect={'solid'} />
              </Ripple>
            </div>
            <div className="button-control next-button">
              <Ripple isCircle={true}>
                <button data-tip="Play">
                  <i className="fa fa-step-forward"></i>
                </button>
                <ReactTooltip effect={'solid'} />
              </Ripple>
            </div>
          </div>
          <div className="volume-controls">
            <i className="fa fa-volume-up"></i>
            <div className="volume-bar"></div>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="progress-bar"></div>
        </div>
        <audio id={AUDIO_PLAYER_ID} autoPlay={AUTO_PLAY}>
          <source src={this.state.audioSrc}/>
        </audio>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    track: state.player.track
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBarComponent);
