import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const getPath = (filename, format) => (
  path.join('.', '__fixtures__', `${filename}.${format}`)
);

describe.each(['stylish', 'plain', 'json'])('%s format', (presentFormat) => {
  const pathToFile = getPath(`${presentFormat}Result`, 'txt');
  const result = fs.readFileSync(pathToFile, 'utf-8');

  test.each(['json', 'yml', 'ini'])('getDiffTest', (format) => {
    const pathToFile1 = getPath('before', format);
    const pathToFile2 = getPath('after', format);
    expect(genDiff(pathToFile1, pathToFile2, presentFormat)).toEqual(result);
  });
});
