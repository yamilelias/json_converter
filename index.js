import { refactored } from './refactored.js';
import { original } from './original.js';
import { iterateMap } from './functions.js';

const getPairing = () => {
  const originalMap = new Map(Object.entries(original));
  const refactoredMap = new Map(Object.entries(refactored));
  const newObj = iterateMap(refactoredMap.entries());
  console.log('newObj', Object.fromEntries(newObj)); // eslint-disable-line no-console
};

getPairing();
