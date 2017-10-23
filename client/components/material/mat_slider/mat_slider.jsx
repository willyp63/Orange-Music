import React from 'react';
import ReactDOM from 'react-dom';

import { isNotEmpty } from '../../../util/empty';

const BAR_CLASS_NAME = 'mat-slider';
const HANDLE_CLASS_NAME = 'handle';

class MatMatSliderComponent extends React.Component {
  componentDidMount() {
    const { value, maxValue } = this.props;
    this.moveHandle.bind(this, value / maxValue)();
  }
  onHandleDown(e) {
    const { onValueChange, maxValue, isDisabled, handleWidth } = this.props;
    if (isDisabled) { return; }

    const onMouseMove = (e) => {
      const offsetRatio = this.getMouseOffsetRatio.bind(this, e)();
      this.moveHandle.bind(this, offsetRatio)();
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
    const { handleWidth } = this.props;
    this.getHandle.bind(this)().css({
      left: getHandleLeft({offsetRatio, handleWidth})
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
    const { value, maxValue, isDisabled, handleWidth, barClassName,
      handleClassName } = this.props;

    let barClassName1 = isNotEmpty(barClassName) ? barClassName : '';
    barClassName1 += ` ${BAR_CLASS_NAME}`;
    barClassName1 = barClassName1.trim();

    let handleClassName1 = isNotEmpty(handleClassName) ? handleClassName : '';
    handleClassName1 += ` ${HANDLE_CLASS_NAME}`;
    handleClassName1 = handleClassName1.trim();

    const offsetRatio = value / maxValue;
    const $slider = !isDisabled
      ? (
          <span className={handleClassName1}
                onMouseDown={this.onHandleDown.bind(this)}
                style={{
                  left: getHandleLeft({offsetRatio, handleWidth}),
                  cursor: 'pointer'
                }}>
          </span>
        )
      : '';

    return (
      <div className={barClassName1}
           onClick={this.changeValue.bind(this)}
           style={{
             cursor: isDisabled ? 'auto' : 'pointer'
           }}>
        {$slider}
      </div>
    );
  }
}

const getHandleLeft = ({offsetRatio, handleWidth}) => {
  return `calc(${offsetRatio * 100}% - ${handleWidth / 2}px)`;
};

export default MatMatSliderComponent;
