import React from 'react';

import MatTabsComponent from '../../material/mat_tabs/mat_tabs';

const TabsComponent = ({tabs}) => {
  return (
    <MatTabsComponent tabsClassName='om-tabs'
                      tabs={tabs} />
  );
}

export default TabsComponent;
