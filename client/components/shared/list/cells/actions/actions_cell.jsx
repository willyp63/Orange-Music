import React from 'react';
import { MatButton } from '../../../../material/index';
import { GRID } from '../../../../material/index';

const BUTTON_SIZE = GRID * 8;
const BUTTON_MARGIN = GRID;

const ActionsCellComponent = (_, track, actions, schema) => {
  const $buttons = Object.keys(schema.actions).map((actionType) => {
    const action = schema.actions[actionType];
    return (
      <MatButton className={action.buttonClassName}
                 icon={action.icon}
                 key={actionType}
                 onClick={() => {
                   if (typeof actions[action.actionName] === 'function') {
                     actions[action.actionName](track);
                   }
                 }} />
    )
  });

  return (
    <div className="actions-cell">
      {$buttons}
    </div>
  );
};

const MockActionsCellComponent = (_, __, ___, schema) => {
  const numButtons = Object.keys(schema).length;
  return (
    <div className="mock-track-actions-cell"
         style={{width: numButtons * BUTTON_SIZE + (numButtons - 1) * BUTTON_MARGIN}}>
    </div>
  );
};

ActionsCellComponent.MockActionsCellComponent = MockActionsCellComponent;
export default ActionsCellComponent;
