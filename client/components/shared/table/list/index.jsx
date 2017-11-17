import React from 'react';
import Row from './row';
import ActionProvider from '../shared/action_provider';

const List = ({ entities, schema, actions }) => {
  const $rows = entities.map(entity => {
  	return (<Row key={entity.mbid || entity.id} entity={entity} schema={schema} actions={actions} />);
  });
  return (
    <div className='om-list'>
      {$rows}
    </div>
  );
};

const ListWithActions = (props) => (
  <ActionProvider>
    <List {...props} />
  </ActionProvider>
);

export default ListWithActions;
