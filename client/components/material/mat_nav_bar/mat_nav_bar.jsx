import React from 'react';
import ReactDOM from 'react-dom';

/// Style for when the window has been scrolled.
export const BOX_SHADOW_STYLE = Object.freeze({
  'border-bottom': 0,
  'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' // .shadow-1()
});

/// Style for when the window has *not* been scrolled.
export const BORDER_STYLE = Object.freeze({
  'border-bottom': '1px solid #e0e0e0',
  'box-shadow': 'none'
});

/// Material Navigation Bar.
///
/// Alternates between a solid bottom border and a shadow border, depending on
/// whether the window has been scrolled.
class MatNavBarComponent extends React.Component {
  componentDidMount() {
    // Bind scroll handler.
    this.scrollHandler = this.updateNavBarStyle.bind(this);
    $(document).scroll(this.scrollHandler);

    // Set initial style.
    this.scrollHandler();
  }
  componentWillUnmount() {
    $(document).off('scroll', this.scrollHandler);
  }
  updateNavBarStyle() {
    const style = $(window).scrollTop() !== 0
      ? BOX_SHADOW_STYLE
      : BORDER_STYLE;
    $(ReactDOM.findDOMNode(this)).css(style);
  }
  render() {
    return (
      <div className='mat-nav-bar'>
        {this.props.children}
      </div>
    );
  }
}

export default MatNavBarComponent;
