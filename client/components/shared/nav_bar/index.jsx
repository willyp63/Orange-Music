import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isScrolled: false};
  }
  componentDidMount() {
    this.onScroll = () => this.setState({isScrolled: isWindowScrolled()});
    $(document).scroll(this.onScroll);
    this.onScroll();
  }
  componentWillUnmount() {
    $(document).off('scroll', this.onScroll);
  }
  componentDidUpdate() {
    const $this = $(ReactDOM.findDOMNode(this));
    const barHeight = $this.find('.om-nav-bar').outerHeight();
    $this.find('.om-nav-bar-placeholder').css({height: barHeight});
  }
  render() {
    return (
      <div>
        <div className={classNames('om-nav-bar', {scrolled: this.state.isScrolled})}>
          {this.props.children}
        </div>
        <div className='om-nav-bar-placeholder'></div>
      </div>
    );
  }
}

const isWindowScrolled = () => $(window).scrollTop() !== 0;

export default NavBar;
