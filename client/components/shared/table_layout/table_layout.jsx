import React from 'react';
import { isNotEmpty, isEmpty } from '../../../util/empty';
import { MatTabs, MatSpinner } from '../../material/index';
import NavBarComponent from '../nav_bar/nav_bar';
import DisplayTypePicker from './display_type_picker';
import { DISPLAY_TYPES } from '../../../schemas/display';
import List from '../table/list/list';
import ListHeader from '../table/list/list_header';
import Gallery from '../table/gallery/gallery';

class TableLayout extends React.Component {
  componentDidMount() {
    const { onScrollBottom } = this.props;
    this.onScroll = (() => {
      // Check if you're at the bottom of the page
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (typeof onScrollBottom === 'function') { onScrollBottom(); }
      }
    }).bind(this);
    $(document).scroll(this.onScroll);
  }
  componentWillUnmount() {
    $(document).off('scroll', this.onScroll);
  }
  render() {
    const { schema, children, tableType, displayType, onTableTypeChange,
      onDisplayTypeChange } = this.props;

    const tableSchema = schema[tableType];

    // A tab for each table type.
    const tabs = Object.keys(schema).map((tableType) => {
      return {
        label: schema[tableType].label,
        value: tableType,
      };
    });

    let $table = '';
    if (tableSchema.entities.length > 0) {
      $table = displayType === DISPLAY_TYPES.GALLERY
        ? (
          <Gallery entities={tableSchema.entities}
                   schema={tableSchema.gallerySchema} />
        ) : (
          <List entities={tableSchema.entities}
                schema={tableSchema.listSchema} />
        );
    } else if (tableSchema.endOfTable) {
      // If there are zero entities and no more to fetch, render empty table component.
      $table = tableSchema.emptyTable || '';
    }

    // List requires header rendered separately in nav bar.
    let $listHeader = displayType === DISPLAY_TYPES.LIST
      ? (<ListHeader schema={tableSchema.listSchema} />)
      : '';

    // Conditional border to separate tabs from list header.
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
                     selectedTab={tableType}
                     onTabSelect={onTableTypeChange} />
            <DisplayTypePicker displayType={displayType}
                               onDisplayTypeChange={onDisplayTypeChange} />
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

export default TableLayout;
