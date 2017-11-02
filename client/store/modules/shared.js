const ensureUniqueMbids = (oldEntities, newEntities) => {
  const takenIds = {};
  oldEntities.forEach(e => takenIds[e.mbid] = true);

  // Whenever a repeat mbid is incountered, we concat '#i' to the mbid,
  // where i is the smallest positive int not in use for that mbid.
  newEntities.forEach(e => {
    const mbid = e.mbid.match(/^(.+?)(?:#|$)/)[1];
    let j = 0, newMbid = mbid;
    while (takenIds[newMbid]) {
      newMbid = `${mbid}#${j++}`;
    }
    e.mbid = newMbid;
  });

  return newEntities;
}

export const concat = (oldEntities, newEntities) => {
  newEntities = ensureUniqueMbids(oldEntities, newEntities);
  return oldEntities.concat(newEntities);
};

export const prepend = (oldEntities, newEntities) => {
  newEntities = ensureUniqueMbids(oldEntities, newEntities);
  return newEntities.concat(oldEntities);
};
