import React from 'react';
import { isNotEmpty } from '../../../util/empty';
import TabsComponent from '../tabs/tabs';
import MatNavBarComponent from '../../material/mat_nav_bar/mat_nav_bar';
import TableTypePickerComponent, { DISPLAY_TYPES } from '../table_type_picker/table_type_picker';
import ListComponent from '../list/list';
import ListHeaderComponent from '../list/list_header';
import GalleryComponent from '../gallery/gallery';

class TableLayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTableType: Object.keys(this.props.tables)[0],
      selectedDisplayType: DISPLAY_TYPES.LIST,
    };
  }
  onTableTypeChange(selectedTableType) {
    if (this.state.selectedTableType === selectedTableType) { return; }
    this.setState({selectedTableType});
  }
  onDisplayTypeChange(selectedDisplayType) {
    if (this.state.selectedDisplayType === selectedDisplayType) { return; }
    this.setState({selectedDisplayType});
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

    return (
      <div className="table-layout">
        <MatNavBarComponent>
          {children}
          <div className="table-options-bar"
               style={isNotEmpty($listHeader)
                        ? {borderBottom: '1px solid #e0e0e0'}
                        : {}}>
            <TabsComponent tabs={tabs}
                           onTabChange={this.onTableTypeChange.bind(this)} />
            <TableTypePickerComponent initialDisplayType={selectedDisplayType}
                                      onDisplayTypeChange={this.onDisplayTypeChange.bind(this)}/>
          </div>
          <div className="list-header-container">
            {$listHeader}
          </div>
        </MatNavBarComponent>
        <div className="table-container">
          {$table}
        </div>
      </div>
    );
  }
}

export default TableLayoutComponent;
