import React from 'react';
import ReactDOM from 'react-dom';
import { isNotEmpty } from '../util/empty';
import Grid from '../../css/grid';

const HANDLE_WIDTH = Grid.GRID * 2;

class MatSlider extends React.Component {
  onHandleDown(e) {
    const { onValueChange, maxValue, isDisabled } = this.props;
    if (isDisabled) { return; }

    const onMouseMove = (e) => {
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
  getMouseOffsetRatio(e) {
    const $bar = $(ReactDOM.findDOMNode(this));
    const mouseOffset = e.pageX - $bar.offset().left;
    let offsetRatio = mouseOffset / $bar.width();
    if (offsetRatio < 0) { offsetRatio = 0; }
    if (offsetRatio > 1) { offsetRatio = 1; }
    return offsetRatio;
  }
  render() {
    const { value, maxValue, isDisabled, className } = this.props;

    let className_1 = className ? className + ' mat-slider' : 'mat-slider';
    if (isDisabled) { className_1 += ' disabled'; }

    return (
      <div className={className_1}
           onClick={this.changeValue.bind(this)}>
        <span className='bar'></span>
        <span className='fill'
              style={{width: getFillWidth(value / maxValue)}}>
        </span>
        <span className='handle'
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

const getFillWidth = (offsetRatio) => {
  return `${offsetRatio * 100}%`;
};

export default MatSlider;
