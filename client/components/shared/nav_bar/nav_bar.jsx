import React from 'react';
import ReactDOM from 'react-dom';

class NavBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false,
    };
  }
  componentDidMount() {
    this.onScroll = () => {
      this.setState({isScrolled: isWindowScrolled()});
    };
    $(document).scroll(this.onScroll);
    this.state = {isScrolled: isWindowScrolled()};
  }
  componentWillUnmount() {
    $(document).off('scroll', this.onScroll);
  }
  render() {
    let className = 'om-nav-bar';
    if (this.state.isScrolled) { className += ' scrolled'; }
    return (
      <div className={className}>{this.props.children}</div>
    );
  }
}

const isWindowScrolled = () => {
  return $(window).scrollTop() !== 0;
};

export default NavBarComponent;
