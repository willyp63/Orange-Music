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
import MatRipple from '../mat_ripple/mat_ripple'
import Grid from '../../css/grid';
import Font from '../../css/font';

const LABEL_PADDING = Grid.GRID * 2;

const MatTabs = ({ tabs, selectedTab, onTabSelect, className, font }) => {
  if (isEmpty(tabs) ||
      isEmpty(selectedTab) ||
      isEmpty(font) ||
      typeof onTabSelect !== 'function') {
    throw 'MatTabs: all properties are required (See mat_tabs.js)!';
  }

  className = className ? className + ' mat-tabs' : 'mat-tabs';

  const $labels = Object.keys(tabs).map((tabValue) => {
    let className = 'tab';
    if (tabValue === selectedTab) { className += ' selected'; }
    return (
      <div className={className}
           key={tabValue}>
        <MatRipple>
          <span onClick={() => {
                  if (tabValue !== selectedTab) { onTabSelect(tabValue); };
                }}>
            {tabs[tabValue].label}
          </span>
        </MatRipple>
      </div>
    );
  });

  let underlineLeft = 0;
  let underLineWidth = 0;
  const tabValues = Object.keys(tabs);
  for (let i = 0; i < tabValues.length; i++) {
    if (tabValues[i] === selectedTab) {
      underLineWidth = getTabWidth(tabs[tabValues[i]].label, font);
      break;
    } else {
      underlineLeft += getTabWidth(tabs[tabValues[i]].label, font);
    }
  }

  return (
    <div className={className}>
      <div className='tabs-container'>
        {$labels}
      </div>
      <div className='underline-container'>
        <div className='underline'
             style={{
               left: underlineLeft,
               width: underLineWidth,
             }}>
        </div>
      </div>
    </div>
  );
};

const getTabWidth = (tabText, font) => {
  const c = Font.measureText(tabText, font);
  return Font.measureText(tabText, font) + LABEL_PADDING * 2;
};

export default MatTabs;
