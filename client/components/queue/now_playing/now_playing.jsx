import React from 'react';
import { isNotEmpty } from '../../../util/empty';
import List from '../../shared/table/list';
import ListHeader from '../../shared/table/list/header';
import LIST_SCHEMA from '../../../schemas/list/now_playing';

const NowPlaying = ({ track }) => {
  const $content = isNotEmpty(track)
    ? (
      <div>
        <ListHeader schema={LIST_SCHEMA} />
        <List entities={[track]} schema={LIST_SCHEMA} />
      </div>
    ) : (
      <div className="empty-msg">
        <span>To play a track, click the blue play icon (</span>
        <i className='material-icons'>play_arrow</i>
        <span>).</span>
      </div>
    );

  return (
    <div className='now-playing'>
      <div className='label'>
        Now Playing
      </div>
      {$content}
    </div>
  );
};

export default NowPlaying;
