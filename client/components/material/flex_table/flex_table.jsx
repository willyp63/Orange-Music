import React from 'react';

import { isNotEmpty } from '../../../util/empty';
import { getNestedFieldValue } from '../../../util/nested_field';

const FlexTableComponent = ({tableClassName, rowObjs, keyPath, schema,
    componentPath}) => {

  tableClassName = isNotEmpty(tableClassName) ? tableClassName : '';
  tableClassName += ' flex-table';
  tableClassName = tableClassName.trim();

  return (
    <div className={tableClassName}>
      {getRows({rowObjs, keyPath, schema, componentPath})}
    </div>
  );
}

const getRows = ({rowObjs, keyPath, schema, componentPath}) => {
  return rowObjs.map((rowObj) => (
    <div className="row"
         key={rowObj[keyPath]}>
      {getColumns({rowObj, schema, componentPath})}
    </div>
  ));
}

const getColumns = ({rowObj, schema, componentPath}) => {
  return Object.keys(schema).map((field) => {
    componentPath = isNotEmpty(componentPath) ? componentPath : 'component';
    const component = schema[field][componentPath];
    const $renderedComponent = typeof component === 'function'
      ? component(getNestedFieldValue(rowObj, field), rowObj)
      : component;
    return getColumn({
      $content: $renderedComponent,
      schema,
      field
    });
  });
}

const getColumn = ({$content, schema, field}) => {
  return (
    <div className="cell"
         key={field}
         style={{flex: `0 1 ${schema[field].width}%`}}>
      {$content}
    </div>
  );
};

export default FlexTableComponent;
