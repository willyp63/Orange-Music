import { isEmpty, isNotEmpty } from '../../util/empty';

export default class MyAudioPlayer {
  constructor(eleId, {onPlay, onPause, onTimeUpdate, onEnded}) {
    this.eleId = eleId;
    this.onPlay = onPlay;
    this.onPause = onPause;
    this.onTimeUpdate = onTimeUpdate;
    this.onEnded = onEnded;
  }
  load() {
    const player = this._audioPlayer()
    if (isEmpty(player)) throw 'MyAudioPlayer failed to find audio element!!';

    player.load();
    player.addEventListener('play', this.onPlay);
    player.addEventListener('pause', this.onPause);
    player.addEventListener('ended', this.onEnded);
    player.addEventListener('timeupdate', () => {
      this.onTimeUpdate(this.currentTime());
    });
  }
  play() {
    this._audioPlayer().play();
  }
  pause() {
    this._audioPlayer().pause();
  }
  setCurrentTime(newCurrentTime) {
    this._audioPlayer().currentTime = newCurrentTime;
  }
  currentTime() {
    return this._audioPlayer().currentTime;
  }
  dispose() {
    player.removeEventListener('play', this.onPlay)
    player.removeEventListener('pause', this.onPause)
    player.removeEventListener('timeupdate', this.onTimeUpdate)
  }
  _audioPlayer() {
    return $('#' + this.eleId)[0]
  }
}
