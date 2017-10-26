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

export const concatEntities = (oldEntities, newEntities, prepend = false) => {
  const takenIds = {};
  for (let i = 0; i < oldEntities.length; i++) {
    takenIds[oldEntities[i].mbid] = true;
  }

  for (let i = 0; i < newEntities.length; i++) {
    const baseMbid = newEntities[i].mbid.match(/^(.+?)(?:#|$)/)[1];
    let j = 0, mbid = baseMbid;
    while (takenIds[mbid]) {
      mbid = `${baseMbid}#${j++}`;
    }
    newEntities[i].mbid = mbid;
  }

  return prepend
    ? newEntities.concat(oldEntities)
    : oldEntities.concat(newEntities);
};
