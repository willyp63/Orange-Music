import React from 'react';
import history from '../../../history';
import classNames from 'classnames';

const Link = ({label, linkLocation, className}) => {
	const onClick = linkLocation
	  ? () => history.pushLocation(linkLocation.pathname, linkLocation.search)
	  : () => {};

	return (
    <span className={classNames(className, {'om-link': linkLocation})} onClick={(e) => {
    	e.stopPropagation();
    	if (linkLocation) { history.pushLocation(linkLocation.pathname, linkLocation.search); }
    }}>
      {label}
    </span>
	);
};

export default Link;
