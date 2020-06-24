import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import formatting from './formatters/index.js';
import parse from './parsers/index.js';

const getObjFromFile = (pathToFile) => {
  const pathToFileNormalize = path.normalize(pathToFile);
  const pathAbsolute = path.resolve(pathToFileNormalize);
  const format = path.extname(pathAbsolute).slice(1);
  const data = fs.readFileSync(pathAbsolute, 'utf-8');

  return parse(data, format);
};

const buildTreeDiff = (before, after) => {
  const getDiffProperty = (key, obj1, obj2) => {
    let result;
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      result = { key, value: buildTreeDiff(obj1[key], obj2[key]), type: 'nested' };
    } else if (!_.has(obj1, key)) {
      result = { key, value: obj2[key], type: 'add' };
    } else if (!_.has(obj2, key)) {
      result = { key, value: obj1[key], type: 'del' };
    } else if (obj1[key] === obj2[key]) {
      result = { key, value: obj1[key], type: 'equal' };
    } else {
      result = {
        key, addValue: obj2[key], delValue: obj1[key], type: 'changed',
      };
    }
    return result;
  };
  return _.union(Object.keys(before), Object.keys(after))
    .map((key) => getDiffProperty(key, before, after));
};

const getDiff = (pathToFile1, pathToFile2, format) => {
  const data1 = getObjFromFile(pathToFile1);
  const data2 = getObjFromFile(pathToFile2);
  const diff = buildTreeDiff(data1, data2);
  return formatting(diff, format);
};

export default getDiff;
