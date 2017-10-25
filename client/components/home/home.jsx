import React from 'react';
import { connect } from 'react-redux';
import { fetchTopTracks, fetchTopArtists } from '../../actions/home_actions';
import HOME_TABLE_SCHEMA, { HOME_TABLE_TYPES } from './home_table_schema';
import TableLayoutComponent from '../shared/table_layout/table_layout';

class HomeComponent extends React.Component {
  componentDidMount() {
    this.props.fetchTopTracks();
    this.props.fetchTopArtists();
  }
  render() {
    const { topTracks, topArtists } = this.props;

    const tableSchema = Object.assign({}, HOME_TABLE_SCHEMA);
    tableSchema[HOME_TABLE_TYPES.TOP_TRACKS].entities = topTracks;
    tableSchema[HOME_TABLE_TYPES.TOP_ARTISTS].entities = topArtists;

    return (
      <div className="home">
        <TableLayoutComponent tableSchema={tableSchema}>
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
    topTracks: state.home.topTracks.tracks,
    topArtists: state.home.topArtists.artists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopTracks: () => { dispatch(fetchTopTracks()); },
    fetchTopArtists: () => { dispatch(fetchTopArtists()); }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
