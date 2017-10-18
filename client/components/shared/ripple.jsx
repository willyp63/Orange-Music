// Credit to Github user: rwu823
// https://github.com/rwu823/react-ripples

import React, { PureComponent } from 'react'

const RIPPLE_STYLE = Object.freeze({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0,
  width: 35,
  height: 35,
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none'
});

const WRAP_STYLE = Object.freeze({
  position: 'absolute',
  display: 'inline-block',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none'
});

const CONTAINER_STYLE = Object.freeze({
  position: 'relative',
  display: 'inline-block'
});

class Ripple extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rippleStyle: {},
    };
  }
  handleClick(e) {
    if (e.stopPropagation) { e.stopPropagation(); }

    const { onClick, color, duration } = this.props;
    const {
      pageX, pageY, currentTarget: {
        offsetLeft, offsetTop,
        offsetWidth, offsetHeight
      }
    } = e;

    const left = pageX - offsetLeft;
    const top = pageY - offsetTop;

    this.setState({
      rippleStyle: {
        top, left,
        opacity: 1,
        backgroundColor: color,
      }
    });

    setTimeout(() => {
      const size = Math.max(offsetWidth, offsetHeight);

      this.setState({
        rippleStyle: {
          top, left,
          backgroundColor: color,
          transition: `all ${duration}ms`,
          transform: `${RIPPLE_STYLE.transform} scale(${size / 9})`,
          opacity: 0,
        }
      });
    }, 50);

    if (typeof onClick === 'function') { onClick(e); }
  }

  render() {
    const wrapStyle = Object.assign({}, this.props.style, WRAP_STYLE);
    const rippleStyle = Object.assign({}, RIPPLE_STYLE, this.state.rippleStyle);
    return (
      <div style={CONTAINER_STYLE}
           onClick={(e) => this.handleClick.bind(this, e)()}>
        <div style={wrapStyle}>
          <s style={rippleStyle} />
        </div>
        {this.props.children}
      </div>
    )
  }
}

Ripple.defaultProps = {
  duration: 600,
  color: 'rgba(255, 255, 255, .3)'
};

export default Ripple
