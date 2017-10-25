import React from 'react';
import { isNotEmpty } from '../../../../../util/empty';
import { getNestedFieldValue } from '../../../../../util/nested_field';

const FlexTableComponent = ({className, rowObjs, keyPath, schema,
    componentPath, actions}) => {

  className = className ? className + ' flex-table' : 'flex-table';

  return (
    <div className={className}>
      {getRows({rowObjs, keyPath, schema, componentPath, actions})}
    </div>
  );
}

const getRows = ({rowObjs, keyPath, schema, componentPath, actions}) => {
  return rowObjs.map((rowObj) => (
    <div className="row"
         key={rowObj[keyPath]}>
      {getColumns({rowObj, schema, componentPath, actions})}
    </div>
  ));
}

const getColumns = ({rowObj, schema, componentPath, actions}) => {
  return Object.keys(schema).map((field) => {
    componentPath = isNotEmpty(componentPath) ? componentPath : 'component';
    const component = schema[field][componentPath];
    const $renderedComponent = typeof component === 'function'
      ? component(getNestedFieldValue(rowObj, field), rowObj, actions, schema[field])
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
