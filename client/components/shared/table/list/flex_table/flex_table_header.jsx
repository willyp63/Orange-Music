import React from 'react';
import { isNotEmpty } from '../../../../../util/empty';
import FlexTable from './flex_table';

const FlexTableHeader = ({className, schema}) => {
  className = className ? className + ' flex-table-header' : 'flex-table-header';

  return (
    <FlexTable className={className}
               rowObjs={[{key: 1}]}
               keyPath={'key'}
               schema={schema}
               componentPath={'label'}>
    </FlexTable>
  );
}

export default FlexTableHeader;
