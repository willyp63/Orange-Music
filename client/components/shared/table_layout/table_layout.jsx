import React from 'react';
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
      selectedTableType: Object.keys(this.props.tableSchemas)[0],
      selectedDisplayType: TABLE_DISPLAY_TYPES.GALLERY,
    };
    this.fetchInitialEntities.bind(this)();
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
    this.fetchInitialEntities.bind(this)(newProps);
  }
  fetchInitialEntities(props) {
    const { tableSchemas } = props || this.props;
    const { selectedTableType } = this.state;
    const selectedtableSchema = tableSchemas[selectedTableType];

    if (!selectedtableSchema.isFetching && isEmpty(selectedtableSchema.entities)) {
      if (typeof selectedtableSchema.fetcher === 'function') {
        selectedtableSchema.fetcher();
      }
    }
  }
  fetchMoreEntities() {
    const { tableSchemas } = this.props;
    const { selectedTableType } = this.state;
    const selectedtableSchema = tableSchemas[selectedTableType];

    if (selectedtableSchema.isFetching) { return; }

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

    const $table = selectedDisplayType === TABLE_DISPLAY_TYPES.GALLERY
      ? (
        <GalleryComponent entities={tableSchema.entities}
                          schema={tableSchema.gallerySchema} />
      ) : (
        <ListComponent entities={tableSchema.entities}
                       schema={tableSchema.listSchema} />
      );

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
                                        onDisplayTypeSelect={(displayType) => {
                                          this.setState({selectedDisplayType: displayType});
                                        }} />
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

export default TableLayoutComponent;
