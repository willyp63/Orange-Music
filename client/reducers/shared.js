export const reduce = (prevState, stateChanges) => {const newState = Object.assign({}, prevState);
  Object.keys(stateChanges).forEach((key) => {
    if (key === '#recurse') { return; }

    if (stateChanges['#recurse']) {
      newState[key] = reduce(newState[key], stateChanges[key]);
    } else {
      newState[key] = stateChanges[key];
    }
  });
  return newState;
};

export const concatEntities = (oldEntities, newEntities) => {
  const takenIds = {};
  for (let i = 0; i < oldEntities.length; i++) {
    takenIds[oldEntities[i].mbid] = true;
  }

  for (let i = 0; i < newEntities.length; i++) {
    let j = 0;
    while (takenIds[newEntities[i].mbid]) {
      newEntities[i].mbid = `${newEntities[i].mbid}#${j++}`;
    }
  }

  return oldEntities.concat(newEntities);
};
