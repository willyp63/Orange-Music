import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Popover from 'material-ui/Popover';

class MoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this._updatePopupPosition = this._updatePopupPosition.bind(this);

    this.state = {isMenuOpen: false, anchorEl: null};
  }
  componentDidMount() {
    this._updatePopupPosition();
    $(document).scroll(this._updatePopupPosition);
  }
  componentWillUnmount() {
    $(document).off('scroll', this._updatePopupPosition);
  }
  componentDidUpdate() {
    this._updatePopupPosition();
  }
  openMenu(anchorEl) {
    this.setState({isMenuOpen: true, anchorEl});
  }
  closeMenu() {
    this.setState({isMenuOpen: false});
  }
  _updatePopupPosition() {
    const $this = $(ReactDOM.findDOMNode(this));
    $(this.moreMenu).css({
      position: 'fixed',
      bottom: window.innerHeight - ($this.offset().top + $this.height() / 2) + window.scrollY,
      right: window.innerWidth - ($this.offset().left + $this.width() / 2),
    });
  }
  render() {
    const { actionModels } = this.props;
    const { isMenuOpen, anchorEl, hasEnteredPopup } = this.state;

    const $menuItems = actionModels.map((actionModel) => {
      return (
        <MenuItem key={actionModel.label} selected={false} onClick={() => {
            this.closeMenu();
            actionModel.action();
          }}>
          {actionModel.label}
        </MenuItem>
      );
    });

    return (
      <div className='more-btn'>
    		<Button className='btn'
                raised={true}
                ref={(el) => this.button = el}
    		        onClick={(e) => {
    		          e.stopPropagation();
    		          this.openMenu(e.currentTarget);
    		        }}>
    		  <i className='material-icons'>more_horiz</i>
    		</Button>
        <Popover anchorEl={anchorEl}
                transformOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
                open={isMenuOpen}
                onRequestClose={this.closeMenu}>
          <MenuList onMouseLeave={this.closeMenu}>
            {$menuItems}
          </MenuList>
        </Popover>
      </div>
    );
  }
}

export default MoreButton;