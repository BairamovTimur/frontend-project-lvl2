import _ from 'lodash';

const getSpaces = (depth) => {
  const indentToLevel = 4;

  return ' '.repeat(depth * indentToLevel);
};

const prefixes = {
  added: '+ ',
  deleted: '- ',
  equal: '  ',
  nested: '  ',
};

const presentValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const present = Object.entries(value)
    .map(([key, val]) => {
      const presValue = presentValue(val, depth);
      return `${key}: ${presValue}`;
    }).join('\n');

  const indent = getSpaces(depth);

  return `{\n  ${indent}  ${present}\n${indent}}`;
};

const getTextLine = (key, value, type, depth) => {
  const prefix = prefixes[type];
  const indent = getSpaces(depth);
  const valuePresent = presentValue(value, depth + 1);

  return `  ${indent}${prefix}${key}: ${valuePresent}`;
};

const stringifyNode = (element, depth) => {
  switch (element.type) {
    case 'changed': {
      const added = getTextLine(element.key, element.addedValue, 'added', depth);
      const deleted = getTextLine(element.key, element.deletedValue, 'deleted', depth);

      return `${deleted}\n${added}`;
    }
    case 'added': {
      return getTextLine(element.key, element.value, element.type, depth);
    }
    case 'deleted':
      return getTextLine(element.key, element.value, element.type, depth);
    case 'equal':
      return getTextLine(element.key, element.value, element.type, depth);
    default:
      throw new Error(`Unknown element type: '${element.type}'!`);
  }
};

const stringifyDiff = (diff, depth = 0) => {
  const indent = getSpaces(depth);
  const result = diff
    .map((element) => {
      if (element.type === 'nested') {
        const presentChildren = stringifyDiff(element.children, depth + 1);

        return getTextLine(element.key, presentChildren, element.type, depth);
      }

      return stringifyNode(element, depth);
    }).join('\n');

  return `{\n${result}\n${indent}}`;
};

const formattingStylish = (diff) => stringifyDiff(diff);

export default formattingStylish;
