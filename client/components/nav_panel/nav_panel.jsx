import React from 'react';

import NavButtonComponent from './nav_button/nav_button';

const NavPanelComponent = ({history}) => {
  return (
    <div className="om-nav-panel">
      <div className="nav-btns">
        <NavButtonComponent text={'Home'}
                            route={'/'}>
        </NavButtonComponent>
        <div className="divider"></div>
        <NavButtonComponent text={'Search'}
                            icon={'search'}
                            route={'/search'}>
        </NavButtonComponent>
        <div className="divider"></div>
        <NavButtonComponent text={'Queue'}
                            route={'/queue'}>
        </NavButtonComponent>
        <NavButtonComponent text={'Playlists'}
                            route={'/playlists'}>
        </NavButtonComponent>
      </div>
    </div>
  )
};

export default NavPanelComponent;
