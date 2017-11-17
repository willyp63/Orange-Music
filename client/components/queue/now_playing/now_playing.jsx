import React from 'react';
import List from '../../shared/table/list';
import ListHeader from '../../shared/table/list/header';
import TABLE_SCHEMA from '../../../schemas/table/now_playing';

const NowPlaying = ({ track }) => {
  const $content = track
    ? (
      <div>
        <ListHeader schema={TABLE_SCHEMA} />
        <List entities={[track]} schema={TABLE_SCHEMA} />
      </div>
    ) : (
      <div className="empty-table-msg">
        Nothing playing.
      </div>
    );

  return (
    <div className='now-playing'>
      <div className='label'>Now Playing</div>
      {$content}
    </div>
  );
};

export default NowPlaying;
