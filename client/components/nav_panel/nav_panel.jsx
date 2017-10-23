import React from 'react';
import { withRouter } from 'react-router';
import { MatButton } from '../material/index';

const NavPanelComponent = ({history}) => {
  return (
    <div className="om-nav-panel">
      <div className="nav-btns">
        <MatButton text={'HOME'}
                   onClick={() => { history.push('/'); }} />
        <MatButton text={'SEARCH'}
                   icon={'search'}
                   onClick={() => { history.push('/search'); }} />
        <MatButton text={'QUEUE'}
                   onClick={() => { history.push('/queue'); }} />
      </div>
    </div>
  );
};

export default withRouter(NavPanelComponent);
