import React from 'react';

import { MatTabs } from '../../material/index';
import { FONT } from '../../material/index';

const TABS_FONT = FONT.FONT_TYPES.HEADLINE;

const TabsComponent = ({tabs, selectedTab, onTabSelect}) => {
  return (
    <MatTabs className='om-tabs'
             tabs={tabs}
             selectedTab={selectedTab}
             onTabSelect={onTabSelect}
             font={TABS_FONT} />
  );
}

export default TabsComponent;
