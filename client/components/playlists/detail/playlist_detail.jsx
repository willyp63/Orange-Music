import React from 'react';
import { connect } from 'react-redux';
import TABLE_SCHEMA, { PLAYLIST_DETAIL_TABLE_TYPES } from '../../../schemas/table/playlist_detail';
import TableLayoutComponent from '../../shared/table_layout/table_layout';
import { setPlaylistDetailDisplayType, fetchTracks } from '../../../store/modules/playlist_detail';

class PlaylistDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { tracks, displayType, setDisplayType, fetchTracks } = this.props;

    const schema = Object.assign({}, TABLE_SCHEMA);

    schema[PLAYLIST_DETAIL_TABLE_TYPES.TRACKS].entities = tracks.tracks;
    schema[PLAYLIST_DETAIL_TABLE_TYPES.TRACKS].isFetching = tracks.isFetching;

    return (
      <div className="om-playlist-detail">
        <TableLayoutComponent schema={schema}
                              tableType={PLAYLIST_DETAIL_TABLE_TYPES.TRACKS}
                              displayType={displayType}
                              onDisplayTypeChange={setDisplayType}>
          <div className="title-container">
            <span>Playlist's Tracks</span>
          </div>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistDetail);
