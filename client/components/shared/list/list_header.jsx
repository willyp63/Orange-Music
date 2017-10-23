import React from 'react';
import FlexTableHeaderComponent from '../flex_table/flex_table_header';

const ListHeaderComponent = ({schema}) => {
  return (
    <FlexTableHeaderComponent className={'om-list-header'}
                              schema={schema} />
  )
};

export default ListHeaderComponent;
