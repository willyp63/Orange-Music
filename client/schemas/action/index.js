import { UNIVERSAL_ACTION_TYPES } from './universal';

export const getPlayActionModel = ({ schema, entity, actions }) => {
	const actionModel = schema.actions[UNIVERSAL_ACTION_TYPES.PLAY];
	if (!actionModel) { return null; }

  const action = actions[actionModel.actionName].bind(null, entity);
  return bindAction(actionModel, action);
}

export const getNonPlayActionModels = ({ schema, entity, actions }) =>
  Object.keys(schema.actions)
	  .filter((actionType) => actionType !== UNIVERSAL_ACTION_TYPES.PLAY)
	  .map((actionType) => schema.actions[actionType])
	  .filter((actionModel) => !actionModel.test || actionModel.test(entity))
    .map((actionModel) => {
	    const action = actions[actionModel.actionName].bind(null, entity);
	    return bindAction(actionModel, action);
	  });
  

const bindAction = (actionModel, action) => Object.assign({}, actionModel, {action});
