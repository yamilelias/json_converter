import fs from "fs";

/**
 * Any valid JSON string
 * @typedef {string} JSON
 */

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
 * It searches with the provided value if any of the object keys match.
 * @param {Map<string, string>} map
 * @param {string} searchValue
 * @returns string | undefined
 */
export const getKeyFromValue = (map, searchValue) => {
  for (let [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
};

/**
 * Returns a New Map with the key bindings.
 * @param {Map<string, unknown>} original The original JSON were we will take the strings from
 * @param {Map<string, unknown>} refactored The JSON with the new structure that we will match
 * @returns {Map<string, unknown>}
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
 * @returns void
 */
export const writeTemporaryConsoleLine = (text) => {
  process.stdout.clearLine(); // clear current text
  process.stdout.write(text);
  process.stdout.cursorTo(0); // move cursor to beginning of line
};

/**
 * A function to save the provided JSON to a file.
 * @param {JSON} language The complete language that will be saved to the file
 * @param {string} key The language key to use it as the file name
 */
export const saveToFile = async (language, key) => {
  const fileName = `./output/${key}.json`;
  const JSONLanguage = JSON.stringify(language);

  await fs.writeFile(fileName, JSONLanguage, "utf8", undefined);

  console.log(`The language "${key}" has been created successfully.`);
};
