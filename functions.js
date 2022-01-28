/**
 * Accessing nested JavaScript objects and arrays by string path.
 * @param obj
 * @param str
 * @returns {*}
 */
export const objectValueByString = (obj, str) => {
  str = str.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  str = str.replace(/^\./, '');           // strip a leading dot
  let levels = str.split('.');
  for (let index = 0, n = levels.length; index < n; ++index) {
    let tester = levels[index];
    if (tester in obj) {
      obj = obj[tester];
    } else {
      return;
    }
  }
  return obj;
};

/**
 * Iterate all the levels in an array of objects.
 * @param level
 * @returns {(function(*): void)|*}
 */
export const iterateArrayOfObjectsLevels = (level = 0) => (parentNode) => {
  if (parentNode.children && level < 2) {
    parentNode.children.forEach(iterateMapLevels(level + 1));
  }
};

const getKeyFromValue = (map, searchValue) => {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
};

/**
 * Returns a New Map with the key bindings.
 * @param original
 * @param refactored
 * @returns {Map<any, any>}
 */
export const getNewMap = (original, refactored) => {
  const iterateMap = (entries) => {
    const newObj = new Map();
    for (const [key, value] of entries) {
      if (typeof value === 'object') {
        const child = iterateMap(Object.entries(value));
        newObj.set(key, Object.fromEntries(child));
      } else {
        const str = getKeyFromValue(original, value);
        const newValue = str ? str : '';
        newObj.set(key, newValue);
      }
    }

    return newObj;
  };

  return iterateMap(refactored.entries());
};