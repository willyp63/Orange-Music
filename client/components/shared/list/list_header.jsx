import React from 'react';

import FlexTableHeaderComponent from '../../material/flex_table/flex_table_header';

const ListHeaderComponent = ({schema}) => {
  return (
    <FlexTableHeaderComponent headerClassName={'om-list-header'}
                              schema={schema} />
  )
};

export default ListHeaderComponent;
