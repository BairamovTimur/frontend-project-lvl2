import _ from 'lodash';

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
    }).join('\n');

  const indent = getSpaces(deep);

  return `{\n  ${indent}${prefixes.equal}${present}\n${indent}}`;
};

const getTextLine = (key, value, type, deep) => {
  const prefix = prefixes[type];
  const indent = getSpaces(deep);
  const valuePresent = presentValue(value, deep + 1);

  return `  ${indent}${prefix}${key}: ${valuePresent}`;
};

const stylishFormatter = (diff, deep = 0) => {
  const indent = getSpaces(deep);
  const result = diff
    .flatMap((element) => {
      if (element.type === 'changed') {
        const add = getTextLine(element.key, element.addValue, 'add', deep);
        const del = getTextLine(element.key, element.delValue, 'del', deep);

        return [del, add];
      }
      const useValue = element.type === 'nested' ? stylishFormatter(element.children, deep + 1) : element.value;

      return getTextLine(element.key, useValue, element.type, deep);
    }).join('\n');

  return `{\n${result}\n${indent}}`;
};

export default stylishFormatter;
