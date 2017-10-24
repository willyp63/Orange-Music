import React from 'react';
import { MatButton } from '../../../../material/index';

const ActionsCellComponent = (_, track, actions, schema) => {
  const $buttons = Object.keys(schema.actions).map((actionType) => {
    const action = schema.actions[actionType];
    return (
      <MatButton className={action.buttonClassName}
                 icon={action.icon}
                 isRaised={true}
                 isCircle={true}
                 key={actionType}
                 onClick={() => { actions[action.actionName](track); }} />
    )
  });

  return (
    <div className="actions-cell">
      {$buttons}
    </div>
  );
};

export default ActionsCellComponent;
