import React from 'react';
import { isNotEmpty, isEmpty } from '../../../util/empty';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import NavBar from '../nav_bar';
import Tabs, { Tab } from 'material-ui/Tabs';
import DisplayTypePicker from './display_type_picker';
import { DISPLAY_TYPES } from '../../../schemas/display_type';
import List from '../table/list';
import ListHeader from '../table/list/header';
import Gallery from '../table/gallery';
import classNames from 'classnames';

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

    const $tabs = Object.keys(schema).length > 1
      ? (
        <Tabs className='tabs'
              value={tableType}
              onChange={(e, i) => onTableTypeChange(`${i}`)}
              indicatorClassName='underline'>
          {
            Object.keys(schema).map((tt) => {
              const label = schema[tt].label;
              return (<Tab className={classNames('tab', {active: tt === tableType})}
                           key={label}
                           label={label} />);
            })
          }
        </Tabs>
      ) : <div></div>;

    let $table = '';
    if (tableSchema.entities.length > 0) {
      $table = displayType === DISPLAY_TYPES.GALLERY
        ? (
          <Gallery entities={tableSchema.entities}
                   schema={tableSchema.tableSchema} />
        ) : (
          <List entities={tableSchema.entities}
                schema={tableSchema.tableSchema} />
        );
    } else if (tableSchema.endOfTable) {
      // If there are zero entities and no more to fetch, render empty table component.
      $table = tableSchema.emptyTable || '';
    }

    // List requires header rendered separately in nav bar.
    let $listHeader = displayType === DISPLAY_TYPES.LIST
      ? (<ListHeader schema={tableSchema.tableSchema} />)
      : '';

    // Conditional border to separate tabs from list header.
    let tableControlsContainerClassName = 'table-controls-container';
    if (isNotEmpty($listHeader)) {
      tableControlsContainerClassName += ' bordered';
    }

    const $spinner = tableSchema.isFetching
      ? (<CircularProgress className='spinner' />) : '';

    return (
      <div className="om-table-layout">
        <NavBar>
          {children}
          <div className={tableControlsContainerClassName}>
            {$tabs}
            <DisplayTypePicker displayType={displayType}
                               onDisplayTypeChange={onDisplayTypeChange} />
          </div>
          <div className="list-header-container">
            {$listHeader}
          </div>
        </NavBar>
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
