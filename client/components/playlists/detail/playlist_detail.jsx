import React from 'react';
import { connect } from 'react-redux';
import history from '../../../history';
import TABLE_SCHEMA, { PLAYLIST_DETAIL_TABLE_TYPES } from '../../../schemas/table_layout/playlist_detail';
import Button from 'material-ui/Button';
import TableLayoutComponent from '../../shared/table_layout';
import { playList } from '../../../store/modules/queue';
import { setPlaylistDetailDisplayType, fetchTracks } from '../../../store/modules/playlist_detail';

class PlaylistDetail extends React.Component {
  constructor(props) {
    super(props);

    props.fetchTracks();
  }
  componentWillReceiveProps(newProps) {
    newProps.fetchTracks();
  }
  render() {
    const { tracks, displayType, setDisplayType, fetchTracks, playList } = this.props;
    const trackEntities = tracks.tracks;

    const schema = Object.assign({}, TABLE_SCHEMA);

    schema[PLAYLIST_DETAIL_TABLE_TYPES.TRACKS].entities = trackEntities;
    schema[PLAYLIST_DETAIL_TABLE_TYPES.TRACKS].isFetching = tracks.isFetching;

    return (
      <div className="om-playlist-detail">
        <TableLayoutComponent schema={schema}
                              tableType={PLAYLIST_DETAIL_TABLE_TYPES.TRACKS}
                              displayType={displayType}
                              onDisplayTypeChange={setDisplayType}>
           <Button className='play-all-btn'
                   raised={true}
                   onClick={() => playList(trackEntities)}>
            PLAY ALL
          </Button>
        </TableLayoutComponent>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    displayType: state.playlistDetail.displayType,
    tracks: state.playlistDetail.tracks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayType: (displayType) => { dispatch(setPlaylistDetailDisplayType(displayType)); },
    fetchTracks: () => { dispatch(fetchTracks()); },
    playList: (tracks) => { dispatch(playList(tracks)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistDetail);
