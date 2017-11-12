import React from 'react';
import ReactDOM from 'react-dom';

class NavBar extends React.Component {
  componentDidUpdate() {
    const $this = $(ReactDOM.findDOMNode(this));
    const barHeight = $this.find('.om-nav-bar').outerHeight();
    $this.find('.om-nav-bar-placeholder').css({height: barHeight});
  }
  render() {
    return (
      <div>
        <div className='om-nav-bar'>
          {this.props.children}
        </div>
        <div className='om-nav-bar-placeholder'></div>
      </div>
    );
  }
}

export default NavBar;
