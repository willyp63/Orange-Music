import React from 'react';
import { connect } from 'react-redux';

import { isNotEmpty } from '../../util/empty';
import { getUrlWithUpdatedParams } from '../../util/url';
import { formatTimeMinutesSeconds } from '../../util/time';
import MyAudioPlayer from './my_audio_player';

const AUTO_PLAY = 'true';

const STREAM_BASE_URL = '/stream';

const AUDIO_PLAYER_ID = 'audio-player';

class PlayerBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentTime: null
    };
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
    });
  }
  render() {
    const trackInfo = isNotEmpty(this.props.track)
      ? this.props.track.name + ' @ ' + this.props.track.name
      : 'No song playing';
    const audioSource = isNotEmpty(this.props.track)
        ? (<source src={getUrlWithUpdatedParams(STREAM_BASE_URL, {
            q: this.props.track.name,
            aq: this.props.track.artist
          })}/>)
        : '';
    return (
      <div>
        <div>{trackInfo}</div>
        <audio controls id={AUDIO_PLAYER_ID} autoPlay={AUTO_PLAY}>{audioSource}</audio>
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
