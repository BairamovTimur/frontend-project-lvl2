import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import getDiff from '../src/genDifference.js';

const getPath = (filename, format) => (
  path.join('.', '__fixtures__', `${filename}.${format}`)
);

let result;

beforeAll(() => {
  const pathToFile = getPath('result', 'txt');
  result = fs.readFileSync(pathToFile, 'utf-8');
});

test.each(['json', 'yml', 'ini'])('getDiffTest', (format) => {
  const pathToFile1 = getPath('before', format);
  const pathToFile2 = getPath('after', format);
  expect(getDiff(pathToFile1, pathToFile2)).toEqual(result);
});
