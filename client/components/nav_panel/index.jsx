import React from 'react';
import history from '../../history';
import SessionButtons from './session_buttons';
import Button from 'material-ui/button';

const NavPanel = () => {
  return (
    <div className='om-nav-panel'>
      <div className='nav-btns'>
        <Button className='home-btn' onClick={() => { history.pushLocation('/'); }}>
          <i className='icon-orange-slice'></i>
        </Button>
        <div className='divider'></div>
        <Button className='search-btn' onClick={() => { history.pushLocation('/search'); }} >
          SEARCH
          <i className='material-icons'>search</i>
        </Button>
        <div className='divider'></div>
        <Button onClick={() => { history.pushLocation('/queue'); }}>
          QUEUE
        </Button>
        <Button onClick={() => { history.pushLocation('/playlists'); }}>
          PLAYLISTS
        </Button>
      </div>
      <SessionButtons />
    </div>
  );
};

export default NavPanel;
