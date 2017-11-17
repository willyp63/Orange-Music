import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { UNIVERSAL_ACTION_TYPES } from '../../../../../schemas/action/universal';

class MoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.state = {isMenuOpen: false};
  }
  openMenu() {
    this.setState({isMenuOpen: true}, () => {
      // Focus first option, so we can then close the menu on blur.
      $(ReactDOM.findDOMNode(this)).find('.more-menu button')[0].focus();
    });
  }
  closeMenu() {
    this.setState({isMenuOpen: false});
  }
  render() {
    const { entity, schema, actions } = this.props;
    const { isMenuOpen } = this.state;

    // All actions except play action.
    const menuActionTypes = Object.keys(schema.actions).filter((actionType) => {
      return actionType !== UNIVERSAL_ACTION_TYPES.PLAY;
    });

    const $menuItems = menuActionTypes.map((actionType) => {
      const action = schema.actions[actionType];
      return (
        <Button className='menu-item'
                key={action.label}
                onClick={(e) => {
                  e.stopPropagation();
                  this.closeMenu();

                  // Call action with entity.
                  actions[action.actionName](entity);
                }}> 
          {action.label}
        </Button>
      );
    });

    return (
      <div className='more-btn'>
    		<Button className='btn'
                raised={true}
    		        onClick={(e) => {
    		          e.stopPropagation();
    		          this.openMenu();
    		        }}>
    		  <i className='material-icons'>more_horiz</i>
    		</Button>
    		<div className={classNames('more-menu', {open: isMenuOpen})}
    		     onClick={(e) => {
    		       e.stopPropagation();
    		       this.openMenu();
    		     }}
    		     onBlur={() => this.closeMenu()}>
    		  {$menuItems}
    		</div>
      </div>
    );
  }
}

export default MoreButton;