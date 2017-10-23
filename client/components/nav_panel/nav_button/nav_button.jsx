import React from 'react';
import { withRouter } from 'react-router';
import { isNotEmpty } from '../../../util/empty';
import { MatButton } from '../../material/index';

const NavButtonComponent = ({text, icon, route, history}) => {
  route = isNotEmpty(route) ? route : '/';
  return (
    <MatButton text={text}
               icon={icon}
               onClick={() => {
                 history.push(route);
               }} />
  );
};

export default withRouter(NavButtonComponent);
