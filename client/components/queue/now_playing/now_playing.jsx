import React from 'react';
import { isNotEmpty } from '../../../util/empty';
import ListComponent from '../../shared/table/list/list';
import ListHeaderComponent from '../../shared/table/list/list_header';
import NOW_PLAYING_LIST_SCHEMA from '../../shared/table/list/schemas/now_playing_list_schema';

const NowPlayingComponent = ({track}) => {
  return (
    <div className='now-playing'>
      <div className='label'>
        Now Playing
      </div>
      <ListHeaderComponent schema={NOW_PLAYING_LIST_SCHEMA} />
      <ListComponent entities={isNotEmpty(track) ? [track] : []}
                     schema={NOW_PLAYING_LIST_SCHEMA} />
    </div>
  );
};

export default NowPlayingComponent;
