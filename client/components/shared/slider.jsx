import React from 'react';

class SliderComponent extends React.Component {
  componentDidMount() {
    const { value, maxValue, handleSize, barClassName,
        handleClassName } = this.props;
    const handleSelector = `.${getBarClassName(barClassName)} `
        + `.${getHandleClassName(handleClassName)}`;
    $(handleSelector).css({
      left: getHandleLeft(value / maxValue, handleSize)
    });
  }
  onBarClick(e) {
    const { onValueChange, maxValue, disabled } = this.props;
    if (disabled || typeof onValueChange !== 'function') { return ; }

    const newValue = this.getMouseOffsetRatio.bind(this, e)() * maxValue;
    this.props.onValueChange(newValue);
  }
  onHandleDown(e) {
    const { onValueChange, maxValue, disabled, handleSize,
        barClassName, handleClassName } = this.props;
    if (disabled) { return; }

    const onMouseMove = (e) => {
      const offsetRatio = this.getMouseOffsetRatio.bind(this, e)();
      const handleSelector = `.${getBarClassName(barClassName)} `
          + `.${getHandleClassName(handleClassName)}`;
      $(handleSelector).css({
        left: getHandleLeft(offsetRatio, handleSize)
      });
    }

    const onMouseUp = (e) => {
      $(window).off('mousemove', onMouseMove);
      $(window).off('mouseup', onMouseUp);

      if (typeof onValueChange !== 'function') { return; }
      const newValue = this.getMouseOffsetRatio.bind(this, e)() * maxValue;
      this.props.onValueChange(newValue);
    };

    $(window).mousemove(onMouseMove);
    $(window).mouseup(onMouseUp);
  }
  getMouseOffsetRatio(e) {
    const $bar = $(`.${getBarClassName(this.props.barClassName)}`);
    const mouseOffset = e.pageX - $bar.offset().left;
    let offsetRatio = mouseOffset / $bar.width();
    if (offsetRatio < 0) { offsetRatio = 0; }
    if (offsetRatio > 1) { offsetRatio = 1; }
    return offsetRatio;
  }
  render() {
    const { value, maxValue, disabled, handleSize, barClassName,
        handleClassName } = this.props;
    const handleStyle = {
      left: getHandleLeft(value / maxValue, handleSize),
      cursor: 'pointer'
    };
    const barStyle = {
      cursor: disabled ? 'auto' : 'pointer'
    };
    return (
      <div className={getBarClassName(barClassName)}
           style={barStyle}
           onClick={(e) => this.onBarClick.bind(this, e)()}>
        {disabled ? '' : (
          <span className={getHandleClassName(handleClassName)}
                style={handleStyle}
                onMouseDown={(e) => this.onHandleDown.bind(this, e)()}>
          </span>
        )}
      </div>
    );
  }
}

const getBarClassName = (className) => {
  return className || 'slider-bar';
}

const getHandleClassName = (className) => {
  return className || 'slider-handle';
}

const getHandleLeft = (offsetRatio, handleSize) => {
  return `calc(${offsetRatio * 100}% - ${handleSize / 2}px)`;
}

export default SliderComponent;
