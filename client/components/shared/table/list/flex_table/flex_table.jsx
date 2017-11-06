import React from 'react';
import { isNotEmpty } from '../../../../../util/empty';
import { getNestedFieldValue } from '../../../../../util/nested_field';

const FlexTable = ({className, rowObjs, schema, keyPath,
    componentPath, actions}) => {

  className = className ? className + ' flex-table' : 'flex-table';

  return (
    <div className={className}>
      {getRows({rowObjs, schema, keyPath, componentPath, actions})}
    </div>
  );
}

const getRows = ({rowObjs, schema, keyPath, componentPath, actions}) => {
  return rowObjs.map((rowObj) => {
    const key = keyPath ? rowObj[keyPath] : (rowObj.mbid || rowObj.id);
    return (
      <div className="row"
           key={key}>
        {getColumns({rowObj, schema, componentPath, actions})}
      </div>
    );
  });
}

const getColumns = ({rowObj, schema, componentPath, actions}) => {
  return Object.keys(schema).map((field) => {
    componentPath = isNotEmpty(componentPath) ? componentPath : 'component';
    const component = schema[field][componentPath];
    const $rendered = typeof component === 'function'
      ? component(getNestedFieldValue(rowObj, field), rowObj, actions, schema[field])
      : component;
    return getColumn({
      $content: $rendered,
      schema,
      field
    });
  });
}

const getColumn = ({$content, schema, field}) => {
  return (
    <div className="cell"
         key={field}
         style={{flex: `0 1 ${schema[field].width}`}}>
      {$content}
    </div>
  );
};

export default FlexTable;
