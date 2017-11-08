import React from 'react';
import history from '../../history';
import SessionButtons from './session_buttons';
import { MatButton } from '../material/index';

const NavPanel = () => {
  return (
    <div className="om-nav-panel">
      <div className="nav-btns">
        <MatButton className='home-btn'
                   icon={'icon-orange-slice'}
                   onClick={() => { history.pushLocation('/'); }} />
        <div className="divider"></div>
        <MatButton className='search-btn'
                   text={'SEARCH'}
                   icon={'search'}
                   onClick={() => { history.pushLocation('/search'); }} />
        <div className="divider"></div>
        <MatButton text={'QUEUE'}
                   onClick={() => { history.pushLocation('/queue'); }} />
        <MatButton text={'PLAYLISTS'}
                   onClick={() => { history.pushLocation('/playlists'); }} />
      </div>
      <SessionButtons />
    </div>
  );
};

export default NavPanel;
