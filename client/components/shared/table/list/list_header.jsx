import React from 'react';
import FlexTableHeader from './flex_table/flex_table_header';

const ListHeader = ({schema}) => {
  return (
    <FlexTableHeader className={'om-list-header'} schema={schema} />
  )
};

export default ListHeader;
