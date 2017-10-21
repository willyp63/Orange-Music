import React from 'react';

import FlexTableHeaderComponent from '../../shared/flex_table/flex_table_header';

import TABLE_SCHEMA from '../queue_schema';

const QueueTableHeaderComponent = () => {
  return (
    <FlexTableHeaderComponent schema={TABLE_SCHEMA}>
    </FlexTableHeaderComponent>
  );
};

export default QueueTableHeaderComponent;
