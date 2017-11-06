import React from 'react';
import FlexTable from './flex_table/flex_table';
import ActionProvider from '../shared/action_provider';

const List = ({ entities, schema }) => {
  return (
    <ActionProvider>
      <FlexTable className={'om-list'}
                 rowObjs={entities}
                 schema={schema} />
    </ActionProvider>
  )
};

export default List;
