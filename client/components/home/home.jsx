import React from 'react';
import { connect } from 'react-redux';
import TABLE_SCHEMA, { HOME_TABLE_TYPES } from '../../schemas/table/home';
import TableLayoutComponent from '../shared/table_layout/table_layout';
import { fetchEntities, fetchMoreEntities, setHomeTableType, setHomeDisplayType } from '../../store/modules/home';

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.fetchEntities();
  }
  render() {
    const { topTracks, topArtists, tableType, displayType, setTableType,
      setDisplayType, fetchMoreEntities } = this.props;

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
                              onScrollBottom={fetchMoreEntities}>
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
    fetchEntities: (startIdx) => { dispatch(fetchEntities(startIdx)); },
    fetchMoreEntities: (startIdx) => { dispatch(fetchMoreEntities(startIdx)); },
    setTableType: (tableType) => { dispatch(setHomeTableType(tableType)); },
    setDisplayType: (displayType) => { dispatch(setHomeDisplayType(displayType)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
