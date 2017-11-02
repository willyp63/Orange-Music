import React from 'react';
import { connect } from 'react-redux';
import TABLE_SCHEMA, { HOME_TABLE_TYPES } from '../../schemas/table/home';
import TableLayoutComponent from '../shared/table_layout/table_layout';
import { fetchTopTracks, fetchTopArtists, fetchMoreTopTracks,
  fetchMoreTopArtists, setHomeTableType, setHomeDisplayType } from '../../store/modules/home';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this._fetch = this._fetch.bind(this);
    this._fetchMore = this._fetchMore.bind(this);
  }
  componentWillMount() {
    this._fetch();
  }
  _fetch() {
    const { fetchTopTracks, fetchTopArtists, tableType } = this.props;
    if (tableType === HOME_TABLE_TYPES.TOP_TRACKS) {
      fetchTopTracks();
    } else if (tableType === HOME_TABLE_TYPES.TOP_ARTISTS) {
      fetchTopArtists();
    }
  }
  _fetchMore() {
    const { fetchMoreTopTracks, fetchMoreTopArtists, tableType } = this.props;
    if (tableType === HOME_TABLE_TYPES.TOP_TRACKS) {
      fetchMoreTopTracks();
    } else if (tableType === HOME_TABLE_TYPES.TOP_ARTISTS) {
      fetchMoreTopArtists();
    }
  }
  render() {
    const { topTracks, topArtists, tableType, displayType, setTableType,
      setDisplayType } = this.props;

    const schema = Object.assign({}, TABLE_SCHEMA);

    schema[HOME_TABLE_TYPES.TOP_TRACKS].entities = topTracks.tracks;
    schema[HOME_TABLE_TYPES.TOP_TRACKS].isFetching = topTracks.isFetching;

    schema[HOME_TABLE_TYPES.TOP_ARTISTS].entities = topArtists.artists;
    schema[HOME_TABLE_TYPES.TOP_ARTISTS].isFetching = topArtists.isFetching;

    return (
      <div className="om-home">
        <TableLayoutComponent schema={schema}
                              tableType={tableType}
                              onTableTypeChange={setTableType}
                              displayType={displayType}
                              onDisplayTypeChange={setDisplayType}
                              onScrollBottom={this._fetchMore}>
          <div className="title-container">
            <span>Charts</span>
          </div>
        </TableLayoutComponent>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tableType: state.home.tableType,
    displayType: state.home.displayType,
    topTracks: state.home.topTracks,
    topArtists: state.home.topArtists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopTracks: (startIdx) => { dispatch(fetchTopTracks(startIdx)); },
    fetchTopArtists: (startIdx) => { dispatch(fetchTopArtists(startIdx)); },
    fetchMoreTopTracks: (startIdx) => { dispatch(fetchMoreTopTracks(startIdx)); },
    fetchMoreTopArtists: (startIdx) => { dispatch(fetchMoreTopArtists(startIdx)); },
    setTableType: (tableType) => { dispatch(setHomeTableType(tableType)); },
    setDisplayType: (displayType) => { dispatch(setHomeDisplayType(displayType)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
