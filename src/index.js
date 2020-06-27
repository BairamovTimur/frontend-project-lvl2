import fs from 'fs';
import path from 'path';
import formatting from './formatters/index.js';
import parse from './parsers/index.js';
import buildTreeDiff from './buildTreeDiff.js';

const getFullPath = (pathToFile) => {
  const pathToFileNormalize = path.normalize(pathToFile);

  return path.resolve(pathToFileNormalize);
};

const getFormat = (pathToFile) => path.extname(pathToFile).slice(1);

const getData = (pathToFile) => {
  const pathAbsolute = getFullPath(pathToFile);
  const data = fs.readFileSync(pathAbsolute, 'utf-8');

  return parse(data, getFormat(pathAbsolute));
};

const genDiff = (pathToFile1, pathToFile2, format) => {
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);
  const diff = buildTreeDiff(data1, data2);

  return formatting(diff, format);
};

export default genDiff;
