import fs from 'fs';
import { refactored } from './refactored.js';
import { original } from './original.js';
import es from './example/original_es.js';
import pt from './example/original_pt.js';
import { writeTemporaryConsoleLine, getNewMap } from './functions.js';

const languages = {
  es: es,
  pt: pt, // TODO: The second language doesn't work
};

let currentLanguage = '';

const saveToFile = (language, key) => {
  const fileName = `${key}.json`;
  const JSONLanguage = JSON.stringify(language);

  fs.writeFile(fileName, JSONLanguage, (err) => {
    if (err) {
      throw err;
    }
    console.log(`The language "${key}" has been created successfully.`);
  });
};

const replaceNestedObject = (obj) => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      replaceNestedObject(value);
    } else {
      const newValue = languages[currentLanguage][value];
      writeTemporaryConsoleLine(`key: ${key}, value: ${obj[key]}, new: ${newValue}`);
      obj[key] = newValue;
    }
  })
}

const getKeyPairing = () => {
  const originalStructureMap = new Map(Object.entries(original));
  const refactoredStructureMap = new Map(Object.entries(refactored));
  return getNewMap(originalStructureMap, refactoredStructureMap);
};

const iterateLanguages = newPairing => {
  Object.keys(languages).forEach(key => {
    currentLanguage = key; // TODO: Fix scenario with more than one language
    const newLanguage = Object.assign({}, newPairing);
    replaceNestedObject(newLanguage);
    saveToFile(newLanguage, key);
  });
};

const run = () => {
  const newPairing = getKeyPairing();
  iterateLanguages(Object.fromEntries(newPairing));
};

run();