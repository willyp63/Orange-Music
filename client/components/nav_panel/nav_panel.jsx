import React from 'react';
import { withRouter } from 'react-router';
import SessionButtons from './session_buttons';
import { MatButton } from '../material/index';

const NavPanel = ({history, location}) => {
  const pushPath = (path) => {
    const { pathname, search } = location;
    if (pathname !== path) { history.push(path + search); }
  };

  return (
    <div className="om-nav-panel">
      <div className="nav-btns">
        <MatButton className='home-btn'
                   icon={'icon-orange-slice'}
                   onClick={() => { pushPath('/'); }} />
        <div className="divider"></div>
        <MatButton className='search-btn'
                   text={'SEARCH'}
                   icon={'search'}
                   onClick={() => { pushPath('/search'); }} />
        <div className="divider"></div>
        <MatButton text={'QUEUE'}
                   onClick={() => { pushPath('/queue'); }} />
        <MatButton text={'PLAYLISTS'}
                   onClick={() => { pushPath('/playlists'); }} />
      </div>
      <SessionButtons />
    </div>
  );
};

export default withRouter(NavPanel);
