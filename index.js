import { refactored } from './refactored.js';
import { original } from './original.js';
import { getNewMap } from './functions.js';

const getPairing = () => {
  const originalMap = new Map(Object.entries(original));
  const refactoredMap = new Map(Object.entries(refactored));
  const mapBinding = getNewMap(originalMap, refactoredMap);
  console.log('newObj', Object.fromEntries(mapBinding)); // eslint-disable-line no-console
};

getPairing();
