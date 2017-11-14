import React from 'react';
import Button from 'material-ui/Button';

class MatMenu extends React.Component {
  render() {
    const { menuItems } = this.props;

    const $menuItems = menuItems.map(item => {
      const label = item.label || item;
      return (
        <Button className='menu-item'>{label}</Button>
      );
    });

    return (
      <div className='mat-menu'>
        {$menuItems}
      </div>
    );
  }
}

export default MatMenu;
