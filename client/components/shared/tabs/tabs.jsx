import React from 'react';

import MatTabsComponent from '../../material/mat_tabs/mat_tabs';

const TabsComponent = ({tabs, onTabChange}) => {
  return (
    <MatTabsComponent tabsClassName='om-tabs'
                      tabs={tabs}
                      onTabChange={onTabChange} />
  );
}

export default TabsComponent;
