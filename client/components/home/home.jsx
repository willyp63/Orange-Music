import React from 'react';
import { connect } from 'react-redux';
import { fetchTopTracks, fetchTopArtists } from '../../actions/home_actions';
import HOME_TABLE_SCHEMAS, { HOME_TABLE_TYPES } from './home_table_schemas';
import TableLayoutComponent from '../shared/table_layout/table_layout';

class HomeComponent extends React.Component {
  render() {
    const { topTracks, topArtists, fetchTopTracks, fetchTopArtists } = this.props;

    const tableSchemas = Object.assign({}, HOME_TABLE_SCHEMAS);

    tableSchemas[HOME_TABLE_TYPES.TOP_TRACKS].entities = topTracks.tracks;
    tableSchemas[HOME_TABLE_TYPES.TOP_TRACKS].isFetching = topTracks.isFetching;
    tableSchemas[HOME_TABLE_TYPES.TOP_TRACKS].fetcher = fetchTopTracks;

    tableSchemas[HOME_TABLE_TYPES.TOP_ARTISTS].entities = topArtists.artists;
    tableSchemas[HOME_TABLE_TYPES.TOP_ARTISTS].isFetching = topArtists.isFetching;
    tableSchemas[HOME_TABLE_TYPES.TOP_ARTISTS].fetcher = fetchTopArtists;

    return (
      <div className="home">
        <TableLayoutComponent tableSchemas={tableSchemas}>
          <div className="title-container">
            <span>Orange Music</span>
          </div>
        </TableLayoutComponent>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    topTracks: state.home.topTracks,
    topArtists: state.home.topArtists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopTracks: (queryParams) => { dispatch(fetchTopTracks(queryParams)); },
    fetchTopArtists: (queryParams) => { dispatch(fetchTopArtists(queryParams)); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
