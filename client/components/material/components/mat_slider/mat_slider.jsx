import React from 'react';
import ReactDOM from 'react-dom';
import { isNotEmpty } from '../util/empty';
import Grid from '../../css/grid';

const HANDLE_WIDTH = Grid.GRID * 3;
const HANDLE_CLASS_NAME = 'handle';

class MatSlider extends React.Component {
  componentDidMount() {
    const { value, maxValue } = this.props;
    this.moveHandle.bind(this, value / maxValue)();
  }
  onHandleDown(e) {
    const { onValueChange, maxValue, isDisabled } = this.props;
    if (isDisabled) { return; }

    const onMouseMove = (e) => {
      const offsetRatio = this.getMouseOffsetRatio.bind(this, e)();
      this.moveHandle.bind(this, offsetRatio)();
      this.changeValue.bind(this, e)();
    }

    const onMouseUp = (e) => {
      $(window).off('mousemove', onMouseMove);
      $(window).off('mouseup', onMouseUp);
      this.changeValue.bind(this, e)();
    };

    $(window).mousemove(onMouseMove);
    $(window).mouseup(onMouseUp);
  }
  changeValue(e) {
    const { onValueChange, maxValue, isDisabled } = this.props;
    if (isDisabled || typeof onValueChange !== 'function') { return; }

    const offsetRatio = this.getMouseOffsetRatio.bind(this, e)();
    onValueChange(offsetRatio * maxValue);
  }
  moveHandle(offsetRatio) {
    this.getHandle.bind(this)().css({
      left: getHandleLeft(offsetRatio)
    });
  }
  getMouseOffsetRatio(e) {
    const $bar = this.getBar.bind(this)();
    const mouseOffset = e.pageX - $bar.offset().left;
    let offsetRatio = mouseOffset / $bar.width();
    if (offsetRatio < 0) { offsetRatio = 0; }
    if (offsetRatio > 1) { offsetRatio = 1; }
    return offsetRatio;
  }
  getBar() {
    return $(ReactDOM.findDOMNode(this));
  }
  getHandle() {
    return this.getBar.bind(this)().find(`.${HANDLE_CLASS_NAME}`);
  }
  render() {
    const { value, maxValue, isDisabled, className } = this.props;

    let className_1 = className ? className + ' mat-slider' : 'mat-slider';
    if (isDisabled) { className_1 += ' disabled'; }

    const c = getHandleLeft(value / maxValue);

    return (
      <div className={className_1}
           onClick={this.changeValue.bind(this)}>
        <span className={HANDLE_CLASS_NAME}
              onMouseDown={this.onHandleDown.bind(this)}
              style={{left: getHandleLeft(value / maxValue)}}>
        </span>
      </div>
    );
  }
}

const getHandleLeft = (offsetRatio) => {
  return `calc(${offsetRatio * 100}% - ${HANDLE_WIDTH / 2}px)`;
};

export default MatSlider;
