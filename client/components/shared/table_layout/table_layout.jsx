import React from 'react';
import { isNotEmpty } from '../../../util/empty';
import { MatTabs } from '../../material/index';
import NavBarComponent from '../nav_bar/nav_bar';
import DisplayTypePickerComponent, { TABLE_DISPLAY_TYPES } from './display_type_picker/display_type_picker';
import ListComponent from '../table/list/list';
import ListHeaderComponent from '../table/list/list_header';
import GalleryComponent from '../table/gallery/gallery';

class TableLayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTableType: Object.keys(this.props.tables)[0],
      selectedDisplayType: TABLE_DISPLAY_TYPES.GALLERY,
    };
  }
  render() {
    const { tables, children } = this.props;
    const { selectedTableType, selectedDisplayType } = this.state;

    const tabs = Object.keys(tables).map((tableType) => {
      return {
        label: tables[tableType].label,
        value: tableType,
      };
    });

    const selectedTable = tables[selectedTableType];

    const $table = selectedDisplayType === TABLE_DISPLAY_TYPES.GALLERY
      ? (
        <GalleryComponent entities={selectedTable.entities}
                          schema={selectedTable.gallerySchema} />
      ) : (
        <ListComponent entities={selectedTable.entities}
                       schema={selectedTable.listSchema} />
      );

    let $listHeader = selectedDisplayType === TABLE_DISPLAY_TYPES.LIST
      ? (<ListHeaderComponent schema={selectedTable.listSchema} />)
      : '';

    let tableControlsContainerClassName = 'table-controls-container';
    if (isNotEmpty($listHeader)) {
      tableControlsContainerClassName += ' bordered';
    }

    return (
      <div className="om-table-layout">
        <NavBarComponent>
          {children}
          <div className={tableControlsContainerClassName}>
            <MatTabs tabs={tabs}
                     selectedTab={selectedTableType}
                     onTabSelect={(tableType) => {
                       this.setState({selectedTableType: tableType});
                     }} />
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
          <div className='player-spacer'></div>
        </div>
      </div>
    );
  }
}

export default TableLayoutComponent;
