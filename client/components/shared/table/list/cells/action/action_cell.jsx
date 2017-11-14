import React from 'react';
import Button from 'material-ui/Button';

const ActionsCell = (_, track, actions, schema) => {
  return (
    <div className="actions-cell">
      <Button className='more-btn' raised={true}>
        <i className='material-icons'>more_horiz</i>
      </Button>
    </div>
  );
};

export default ActionsCell;
