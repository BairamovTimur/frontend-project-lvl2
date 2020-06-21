import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getObjFromFile = (pathToFile) => {
  const pathToFileNormalize = path.normalize(pathToFile);
  const pathAbsolute = path.resolve(pathToFileNormalize);
  const format = path.extname(pathAbsolute).slice(1);
  const data = fs.readFileSync(pathAbsolute, 'utf-8');

  return parsers[format](data);
};

const buildTreeDiff = (before, after) => {
  const getDiffProperty = (key, obj1, obj2) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: buildTreeDiff(obj1[key], obj2[key]), type: 'nested' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'add' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'del' };
    }
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], type: 'equal' };
    }

    return {
      key, addValue: obj2[key], delValue: obj1[key], type: 'changed',
    };
  };
  return _.union(Object.keys(before), Object.keys(after))
    .map((key) => getDiffProperty(key, before, after));
};

const getSpaces = (deep) => {
  const indentToLevel = 4;

  return ' '.repeat(deep * indentToLevel);
};

const prefixes = {
  add: '+ ',
  del: '- ',
  equal: '  ',
  nested: '  ',
};

const presentValue = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const present = Object.entries(value)
    .map(([key, val]) => {
      const presValue = presentValue(val, deep);
      return `${key}: ${presValue}`;
    }).join('/n');
  const indent = getSpaces(deep);

  return `{\n  ${indent}${prefixes.equal}${present}\n${indent}}`;
};

const getTextLine = (key, value, type, deep) => {
  const prefix = prefixes[type];
  const indent = getSpaces(deep);
  const valuePresent = presentValue(value, deep + 1);

  return `  ${indent}${prefix}${key}: ${valuePresent}`;
};

const stylish = (tree, deep = 0) => {
  const indent = getSpaces(deep);
  const result = tree
    .flatMap((element) => {
      if (element.type === 'changed') {
        const add = getTextLine(element.key, element.addValue, 'add', deep);
        const del = getTextLine(element.key, element.delValue, 'del', deep);
        if (_.isObject(element.addValue) || _.isObject(element.delValue)) {
          return [del, add];
        }

        return [add, del];
      }
      const useValue = element.type === 'nested' ? stylish(element.value, deep + 1) : element.value;

      return getTextLine(element.key, useValue, element.type, deep);
    }).join('\n');

  return `{\n${result}\n${indent}}`;
};

const getDiff = (pathToFile1, pathToFile2) => {
  const data1 = getObjFromFile(pathToFile1);
  const data2 = getObjFromFile(pathToFile2);
  const diff = buildTreeDiff(data1, data2);
  return stylish(diff);
};

export default getDiff;
