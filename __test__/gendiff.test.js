/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import getDiff from '../src/genDifference.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getDiff', () => {
  const pathToFile1 = getFixturePath('before.json');
  const pathToFile2 = getFixturePath('after.json');
  const result = [
    '{',
    '  host: hexlet.io',
    '+ timeout: 20',
    '- timeout: 50',
    '- proxy: 123.234.53.22',
    '- follow: false',
    '+ verbose: true',
    '}',
  ];
  expect(getDiff(pathToFile1, pathToFile2)).toEqual(result.join('\n'));
});
