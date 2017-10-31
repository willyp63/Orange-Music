import React from 'react';
import { MatButton } from '../../../../../material/index';

const ActionsCellComponent = (_, track, actions, schema) => {
  const $buttons = Object.keys(schema.actions).map((actionType) => {
    const action = schema.actions[actionType];
    return (
      <MatButton className={action.buttonClassName}
                 icon={action.icon}
                 tooltipText={action.tooltipText}
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
      <div className="action-btns-container">
        {$buttons}
      </div>
    </div>
  );
};

export default ActionsCellComponent;
