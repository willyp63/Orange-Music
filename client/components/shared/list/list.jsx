import React from 'react';

import FlexTableComponent from '../../material/flex_table/flex_table';

const ListComponent = ({entities, schema}) => {
  return (
    <FlexTableComponent tableClassName={'om-list'}
                        rowObjs={entities}
                        keyPath={'mbid'}
                        schema={schema} />
  )
};

export default ListComponent;
