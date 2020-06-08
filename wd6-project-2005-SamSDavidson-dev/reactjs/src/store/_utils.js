const minutes = 10;
const refreshTime = 1000 * 60 * minutes;

// decide timeout
export function shouldLoad(loadedAt, refreshAt = refreshTime) {
  // time in MS
  const now = Date.now();
  // time difference
  const timeSinceLastLoad = now - loadedAt;
  // if timeout
  const lastLoadedLongerThanRefreshTime = timeSinceLastLoad > refreshAt;
  
  return lastLoadedLongerThanRefreshTime;
}

export function arrayToObject(array) {
  
  return array.reduce((object, item) => ({
    // current object
    ...object,
    // set ID as key and item as value
    [item.id]: item,
  }), {});
}

export function removeIdFromObject(id, object) {
  const { [id]: removedItem, ...objectWithoutId } = object;
  return objectWithoutId;
}

export function removeIdFromArray(id, array) {
  return array.filter(itemId => itemId !== id);
}