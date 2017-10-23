import React from 'react';
import { isNotEmpty } from '../../../util/empty';
import FlexTableComponent from './flex_table';

const FlexTableHeaderComponent = ({className, schema}) => {
  className = isNotEmpty(className) ? className : '';
  className += ' flex-table-header';
  className = className.trim();

  return (
    <FlexTableComponent tableClassName={className}
                        rowObjs={[{key: 1}]}
                        keyPath={'key'}
                        schema={schema}
                        componentPath={'label'}>
    </FlexTableComponent>
  );
}

export default FlexTableHeaderComponent;
