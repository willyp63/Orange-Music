import React from 'react';
import { withRouter } from 'react-router';
import { MatButton } from '../material/index';

const NavPanelComponent = ({history}) => {
  return (
    <div className="om-nav-panel">
      <div className="nav-btns">
        <MatButton text={'HOME'}
                   onClick={() => { history.push('/'); }} />
        <div className="divider"></div>
        <MatButton text={'SEARCH'}
                   icon={'search'}
                   onClick={() => { history.push('/search'); }} />
        <div className="divider"></div>
        <MatButton text={'QUEUE'}
                   onClick={() => { history.push('/queue'); }} />
        <MatButton text={'PLAYLISTS'}
                   onClick={() => { history.push('/playlists'); }} />
      </div>
    </div>
  );
};

export default withRouter(NavPanelComponent);
