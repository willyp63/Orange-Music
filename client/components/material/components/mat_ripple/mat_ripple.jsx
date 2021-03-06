//
// Material Ripple Component
//
// Credit: https://github.com/rwu823/react-ripples
//
// ------------------------------------

import React from 'react'

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
  borderRadius: 'inherit',
  display: 'inline-block',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none'
});

const CONTAINER_STYLE = Object.freeze({
  borderRadius: 'inherit',
  position: 'relative',
  display: 'inline-block'
});

class MatRipple extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rippleStyle: {},
    };
  }
  componentWillUnmount() {
    // Prevent setting state after component unmounts.
    clearTimeout(this.timeout);
  }
  handleClick(e) {
    e.stopPropagation();

    const { onClick, duration } = this.props;
    const { pageX, pageY, currentTarget } = e;
    const targetClientRect = currentTarget.getBoundingClientRect();

    const left = pageX - targetClientRect.left;
    const top = pageY - targetClientRect.top - $(window).scrollTop();

    this.setState({
      rippleStyle: {
        top, left,
        opacity: 1,
      }
    });

    this.timeout = setTimeout(() => {
      const size = Math.max(targetClientRect.width, targetClientRect.height);

      this.setState({
        rippleStyle: {
          top, left,
          transition: `all ${duration}ms`,
          transform: `${RIPPLE_STYLE.transform} scale(${size / 9})`,
          opacity: 0,
        }
      });
    }, 50);

    if (typeof onClick === 'function') { onClick(e); }
  }
  render() {
    const { style, isCircle, children } = this.props;

    const wrapStyle = Object.assign(
      {},
      style,
      WRAP_STYLE,
      isCircle ? {borderRadius: '50%'} : {}
    );
    const rippleStyle = Object.assign(
      {},
      RIPPLE_STYLE,
      this.state.rippleStyle
    );

    return (
      <div className='mat-ripple'
           style={CONTAINER_STYLE}
           onClick={this.handleClick.bind(this)}>
        <div style={wrapStyle}>
          <s style={rippleStyle} />
        </div>
        {children}
      </div>
    )
  }
}

MatRipple.defaultProps = {
  duration: 600,
};

export default MatRipple;
