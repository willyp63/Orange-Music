import React from 'react';
import { isNotEmpty } from '../../../util/empty';
import ListComponent from '../../shared/table/list/list';
import ListHeaderComponent from '../../shared/table/list/list_header';
import LIST_SCHEMA from '../../../schemas/list/now_playing';

const NowPlayingComponent = ({track}) => {
  const $content = isNotEmpty(track)
    ? (
      <div>
        <ListHeaderComponent schema={LIST_SCHEMA} />
        <ListComponent entities={isNotEmpty(track) ? [track] : []}
                       schema={LIST_SCHEMA} />
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

export default NowPlayingComponent;
