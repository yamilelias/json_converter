/**
 * Accessing nested JavaScript objects and arrays by string path.
 * @param {Object} obj
 * @param {string} str
 * @returns {*}
 */
export const objectValueByString = (obj, str) => {
  str = str.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  str = str.replace(/^\./, ""); // strip a leading dot
  let levels = str.split(".");
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
 * @param {number} level
 * @returns {(function(*): void)|*}
 */
export const iterateArrayOfObjectsLevels =
  (level = 0) =>
  (parentNode) => {
    if (parentNode.children && level < 2) {
      parentNode.children.forEach(iterateMapLevels(level + 1));
    }
  };

const getKeyFromValue = (map, searchValue) => {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
};

/**
 * Returns a New Map with the key bindings.
 * @param {Object} original The original JSON were we will take the strings from
 * @param {Object} refactored The JSON with the new structure that we will match
 * @returns {Map<any, any>}
 */
export const getNewMap = (original, refactored) => {
  const iterateMap = (entries) => {
    const newObj = new Map();
    for (const [key, value] of entries) {
      if (typeof value === "object") {
        const child = iterateMap(Object.entries(value));
        newObj.set(key, Object.fromEntries(child));
      } else {
        const str = getKeyFromValue(original, value);
        const newValue = str ? str : "";
        newObj.set(key, newValue);
      }
    }

    return newObj;
  };

  return iterateMap(refactored.entries());
};

/**
 * Writes a line that will be replaced with the following printed
 * @param text
 * @returns {*}
 */
export const writeTemporaryConsoleLine = (text) => {
  process.stdout.clearLine(); // clear current text
  process.stdout.write(text);
  process.stdout.cursorTo(0); // move cursor to beginning of line
};
