import React from 'react';
import { withRouter } from 'react-router';
import { MatButton } from '../material/index';

const NavPanelComponent = ({history, location}) => {
  const pushPath = (path) => {
    if (location.pathname !== path) { history.push(path); }
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
    </div>
  );
};

export default withRouter(NavPanelComponent);
