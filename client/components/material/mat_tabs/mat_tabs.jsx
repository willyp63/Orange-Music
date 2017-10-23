import React from 'react';
import { isNotEmpty, isEmpty } from '../../../util/empty';
import { GRID } from '../../material/grid/grid';

// Keep up to date with mat_tabs.less
const LABEL_WIDTH = GRID * 25;
const LABEL_PADDING = GRID;
const UNDERLINE_LEFT_UNIT = LABEL_WIDTH + (LABEL_PADDING * 2);

/// Material tabs component.
///
/// Selectable labels positioned horizontally. The selected label has an underline.
///
/// property *tabs* is of the form [{label, value}, ...].
class MatTabsComponent extends React.Component {
  constructor(props) {
    super(props);

    // *tabs* should never be emtpty.
    if (isEmpty(this.props.tabs)) {
      throw 'MatTabsComponent: property *tabs* should not be empty';
    }

    // Select first tab.
    this.state = {selectedValue: props.tabs[0].value};
  }
  onLabelClick(labelValue) {
    this.setState({selectedValue: labelValue});
    if (typeof this.props.onTabChange === 'function') {
      this.props.onTabChange(labelValue);
    }
  }
  render() {
    const { tabsClassName, tabs } = this.props;
    const { selectedValue } = this.state;

    let tabsClassName1 = isNotEmpty(tabsClassName) ? tabsClassName : '';
    tabsClassName1 += ' mat-tabs';
    tabsClassName1 = tabsClassName1.trim();

    let underlineLeft;
    const $labels = tabs.map((tab, i) => {
      let className = 'label';
      if (tab.value === selectedValue) {
        underlineLeft = UNDERLINE_LEFT_UNIT * i;
        className += ' selected';
      }
      return (
        <div className={className}
             key={tab.value}
             onClick={() => { this.onLabelClick.bind(this)(tab.value); }}>
          {tab.label}
        </div>
      );
    });

    return (
      <div className={tabsClassName1}>
        <div className='labels-container'>
          {$labels}
        </div>
        <div className='underline-container'>
          <div className='underline'
               style={{left: underlineLeft}}>
          </div>
        </div>
      </div>
    );
  }
}

export default MatTabsComponent;
