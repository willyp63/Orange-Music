//
// Material Tabs Component
//
// Selectable labels positioned horizontally.
// The selected label has an underline.
//
// Properties
//   tabs: static model for component (See example_tabs.js).
//   selectedTab: the selected tab value.
//   onTabSelect: callback for when a new tab is selected.
//
// ------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import { isNotEmpty, isEmpty } from '../util/empty';
import MatButton from '../mat_button/mat_button'
import Grid from '../../css/grid';
import Font from '../../css/font';

const LABEL_PADDING = Grid.GRID * 2;
const DEFAULT_TAB_WIDTH = Grid.GRID * 24;

const MatTabs = ({ tabs, selectedTab, onTabSelect, className, tabWidth }) => {

  if (isEmpty(tabs) ||
      isEmpty(selectedTab) ||
      typeof onTabSelect !== 'function') {
    throw 'MatTabs: all properties are required (See mat_tabs.js)!';
  }

  className = className ? className + ' mat-tabs' : 'mat-tabs';

  tabWidth = tabWidth || DEFAULT_TAB_WIDTH;

  const $labels = Object.keys(tabs).map((tabValue) => {
    let className = 'tab';
    if (tabValue === selectedTab) { className += ' selected'; }
    return (
      <MatButton className={className}
                 text={tabs[tabValue].label}
                 key={tabValue}
                 onClick={() => {
                            if (tabValue !== selectedTab) {
                              onTabSelect(tabValue);
                            };
                          }} />
    );
  });

  let underlineLeft = 0;
  const tabValues = Object.keys(tabs);
  for (let i = 0; i < tabValues.length; i++) {
    if (tabValues[i] === selectedTab) {
      underlineLeft = tabWidth * i;
    }
  }

  return (
    <div className={className}>
      <div className='tabs-container'>
        {$labels}
      </div>
      <div className='underline-container'>
        <div className='underline' style={{left: underlineLeft}}></div>
      </div>
    </div>
  );
};

export default MatTabs;
