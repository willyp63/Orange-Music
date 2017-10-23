import React from 'react';

const TITLE = 'Orange Music';
const LOGO_IMG_SRC = '/static/images/logo.png';

const OrangeMusicTitleComponent = () => {
  return (
    <div className='om-title'>
      <img src={LOGO_IMG_SRC} />
      <span>{TITLE}</span>
    </div>
  );
};

export default OrangeMusicTitleComponent;
