import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getUrlWithUpdatedParams, getUrlParams } from '../../../util/url';
import { isNotEmpty, isEmpty } from '../../../util/empty';
import { MatTabs, MatSpinner } from '../../material/index';
import NavBarComponent from '../nav_bar/nav_bar';
import DisplayTypePickerComponent, { TABLE_DISPLAY_TYPES } from './display_type_picker/display_type_picker';
import ListComponent from '../table/list/list';
import ListHeaderComponent from '../table/list/list_header';
import GalleryComponent from '../table/gallery/gallery';

class TableLayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTableType: this.getTableType.bind(this)(),
      selectedDisplayType: props.tableDisplayType,
    };
    this.fetchInitialEntities.bind(this)();
  }
  getTableType(props) {
    const { tableSchemas, location } = props || this.props;
    let k = 0, tableTypes = Object.keys(tableSchemas);
    for (let i = 0; i < tableTypes.length; i++) {
      if (tableSchemas[i].pathname === location.pathname) { k = i; break; }
    }
    return tableTypes[k];
  }
  componentDidMount() {
    this.onScroll = () => {
      // Check if you're at the bottom of the page
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.fetchMoreEntities.bind(this)();
      }
    };
    this.onScroll = this.onScroll.bind(this);
    $(document).scroll(this.onScroll);
  }
  componentWillUnmount() {
    $(document).off('scroll', this.onScroll);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.tableDisplayType !== this.state.selectedDisplayType) {
      this.setState({selectedDisplayType: newProps.tableDisplayType});
    }
    const selectedTableType = this.getTableType.bind(this)(newProps);
    if (selectedTableType !== this.state.selectedTableType) {
      this.setState({selectedTableType});
    }
    this.fetchInitialEntities.bind(this)(newProps);
  }
  fetchInitialEntities(props) {
    const { tableSchemas } = props || this.props;
    const selectedTableType = this.getTableType.bind(this)(props);
    const selectedtableSchema = tableSchemas[selectedTableType];

    if (!selectedtableSchema.isFetching &&
        !selectedtableSchema.endOfTable &&
        isEmpty(selectedtableSchema.entities)) {

      if (typeof selectedtableSchema.fetcher === 'function') {
        selectedtableSchema.fetcher();
      }
    }
  }
  fetchMoreEntities() {
    const { tableSchemas } = this.props;
    const { selectedTableType } = this.state;
    const selectedtableSchema = tableSchemas[selectedTableType];

    if (selectedtableSchema.isFetching || selectedtableSchema.endOfTable) { return; }

    if (typeof selectedtableSchema.fetcher === 'function') {
      const tableEntities = selectedtableSchema.entities
      const startIndex = isNotEmpty(tableEntities) ? tableEntities.length : 0;
      selectedtableSchema.fetcher({startIndex});
    }
  }
  onTableTypeChange(selectedTableType) {
    this.setState({selectedTableType}, () => {
      this.fetchInitialEntities.bind(this)();
    });

    // Update url
    const { location, tableSchemas } = this.props;
    const { pathname, search } = location;
    const newPathname = tableSchemas[selectedTableType].pathname || pathname;
    const newUrl = newPathname + search;
    const currentUrl = pathname + search;
    if (currentUrl !== newUrl) { this.props.history.push(newUrl); }
  }
  onDisplayTypeChange(selectedDisplayType) {
    this.setState({selectedDisplayType});

    // Update url param
    const { pathname, search } = this.props.location;
    const currentUrl = pathname + search;
    const newUrl = getUrlWithUpdatedParams(currentUrl, {tdt: selectedDisplayType});
    if (currentUrl !== newUrl) { this.props.history.push(newUrl); }
  }
  render() {
    const { tableSchemas, children } = this.props;
    const { selectedTableType, selectedDisplayType } = this.state;

    const tabs = Object.keys(tableSchemas).map((tableType) => {
      return {
        label: tableSchemas[tableType].label,
        value: tableType,
      };
    });

    const tableSchema = tableSchemas[selectedTableType];

    let $table = '';
    if (tableSchema.entities.length > 0) {
      $table = selectedDisplayType === TABLE_DISPLAY_TYPES.GALLERY
        ? (
          <GalleryComponent entities={tableSchema.entities}
                            schema={tableSchema.gallerySchema} />
        ) : (
          <ListComponent entities={tableSchema.entities}
                         schema={tableSchema.listSchema} />
        );
    } else if (tableSchema.endOfTable) {
      $table = tableSchema.emptyTable || '';
    }

    let $listHeader = selectedDisplayType === TABLE_DISPLAY_TYPES.LIST
      ? (<ListHeaderComponent schema={tableSchema.listSchema} />)
      : '';

    let tableControlsContainerClassName = 'table-controls-container';
    if (isNotEmpty($listHeader)) {
      tableControlsContainerClassName += ' bordered';
    }

    const $spinner = tableSchema.isFetching
      ? (<MatSpinner />) : '';

    return (
      <div className="om-table-layout">
        <NavBarComponent>
          {children}
          <div className={tableControlsContainerClassName}>
            <MatTabs tabs={tabs}
                     selectedTab={selectedTableType}
                     onTabSelect={this.onTableTypeChange.bind(this)} />
            <DisplayTypePickerComponent selectedDisplayType={selectedDisplayType}
                                        onDisplayTypeSelect={this.onDisplayTypeChange.bind(this)} />
          </div>
          <div className="list-header-container">
            {$listHeader}
          </div>
        </NavBarComponent>
        <div className="table-container">
          {$table}
        </div>
        <div className="spinner-container">
          {$spinner}
        </div>
        <div className='player-spacer'></div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const urlParams = getUrlParams(ownProps.location.search);
  const tableDisplayType = isNotEmpty(urlParams.tdt)
    ? parseInt(urlParams.tdt)
    : TABLE_DISPLAY_TYPES.GALLERY;
  return {tableDisplayType};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TableLayoutComponent));
