import React from 'react';

import { isNotEmpty } from '../../../../util/empty';

import FlexTableComponent from '../flex_table';

const FlexTableHeaderComponent = ({headerClassName, schema}) => {
  headerClassName = isNotEmpty(headerClassName) ? headerClassName : '';
  headerClassName += ' flex-table-header';
  headerClassName = headerClassName.trim();

  return (
    <FlexTableComponent tableClassName={headerClassName}
                        rowObjs={[{key: 1}]}
                        keyPath={'key'}
                        schema={schema}
                        componentPath={'label'}>
    </FlexTableComponent>
  );
}

export default FlexTableHeaderComponent;
