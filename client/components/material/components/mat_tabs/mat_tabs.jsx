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
import { GRID } from '../../css/grid';

// Keep up to date with mat_tabs.less
const LABEL_WIDTH = GRID * 25;
const LABEL_PADDING = GRID;
const UNDERLINE_LEFT_UNIT = LABEL_WIDTH + (LABEL_PADDING * 2);

const MatTabs = ({ tabs, selectedTab, onTabSelect, className }) => {
  if (isEmpty(tabs) ||
      isEmpty(selectedTab) ||
      typeof onTabSelect !== 'function') {
    throw 'MatTabs: all properties are required (See mat_tabs.js)!';
  }

  className = (className + ' mat-tabs').trim();

  const $labels = Object.keys(tabs).map((tabValue) => {
    let className = 'label';
    if (tabValue === selectedTab) { className += ' selected'; }
    return (
      <div className={className}
           key={tabValue}
           onClick={() => {
             if (tabValue !== selectedTab) { onTabSelect(tabValue); };
           }}>
        {tabs[tabValue].label}
      </div>
    );
  });

  let underlineLeft = 0;
  let underLineWidth = 0;
  Object.keys(tabs).map((tabValue, i) => {
    if (tabValue === selectedTab) { underlineLeft = UNDERLINE_LEFT_UNIT * i; }
  });

  return (
    <div className={className}>
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
};

export default MatTabs;
