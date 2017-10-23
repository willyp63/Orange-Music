import React from 'react';

import { MatTabs } from '../../material/index';

const TabsComponent = ({tabs, selectedTab, onTabSelect}) => {
  return (
    <MatTabs className='om-tabs'
             tabs={tabs}
             selectedTab={selectedTab}
             onTabSelect={onTabSelect} />
  );
}

export default TabsComponent;
