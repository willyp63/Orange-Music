import React from 'react';
import { isNotEmpty } from '../../../util/empty';
import TabsComponent from '../tabs/tabs';
import NavBarComponent from '../nav_bar/nav_bar';
import DisplayTypePickerComponent, { TABLE_DISPLAY_TYPES } from './display_type_picker/display_type_picker';
import ListComponent from '../list/list';
import ListHeaderComponent from '../list/list_header';
import GalleryComponent from '../gallery/gallery';

class TableLayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTableType: Object.keys(this.props.tables)[0],
      selectedDisplayType: TABLE_DISPLAY_TYPES.LIST,
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

    const $table = selectedDisplayType === DISPLAY_TYPES.GALLERY
      ? (
        <GalleryComponent entities={selectedTable.entities}
                          component={selectedTable.galleryComponent} />
      ) : (
        <ListComponent entities={selectedTable.entities}
                       schema={selectedTable.listSchema} />
      );

    let $listHeader = selectedDisplayType === DISPLAY_TYPES.LIST
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
            <TabsComponent tabs={tabs}
                           selectedTab={selectedTableType}
                           onTabSelect={(tableType) => {
                             this.setState({selectedTableType: tableType});
                           }} />
            <TableTypePickerComponent selectedDisplayType={selectedDisplayType}
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
      </div>
    );
  }
}

export default TableLayoutComponent;
