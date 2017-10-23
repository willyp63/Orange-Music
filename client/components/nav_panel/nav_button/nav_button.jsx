import React from 'react';
import { withRouter } from 'react-router';

import MatButtonComponent from '../../material/mat_button/mat_button';
import { grey_darken_1, grey } from '../../material/mat_color/mat_color';

import { isNotEmpty } from '../../../util/empty';

const NavButtonComponent = ({text, icon, route, history}) => {
  route = isNotEmpty(route) ? route : '/';
  return (
    <MatButtonComponent wrapClassName={'nav-btn-wrap'}
                        buttonClassName={'nav-btn'}
                        isText={true}
                        text={text}
                        icon={icon}
                        color={grey_darken_1}
                        colorHover={grey}
                        onClick={() => {
                          history.push(route);
                        }}>
    </MatButtonComponent>
  );
};

export default withRouter(NavButtonComponent);
