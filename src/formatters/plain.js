import _ from 'lodash';

const presentValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const getPathPropertyElement = (pathProperty, key) => {
  const separator = pathProperty === '' ? '' : '.';
  return `${pathProperty}${separator}${key}`;
};

const getTextLine = (element, property) => {
  switch (element.type) {
    case 'changed': {
      const addedValue = presentValue(element.addedValue);
      const deletedValue = presentValue(element.deletedValue);

      return `Property '${property}' was changed from ${deletedValue} to ${addedValue}`;
    }
    case 'added': {
      const value = presentValue(element.value);

      return `Property '${property}' was added with value: ${value}`;
    }
    case 'deleted':
      return `Property '${property}' was deleted`;
    case 'equal':
      return '';
    default:
      throw new Error(`Unknown element type: '${element.type}'!`);
  }
};

const stringifyDiff = (diff, pathProperty) => diff
  .map((element) => {
    const pathPropertyElement = getPathPropertyElement(pathProperty, element.key);

    if (element.type === 'nested') {
      return stringifyDiff(element.children, pathPropertyElement);
    }

    return getTextLine(element, pathPropertyElement);
  })
  .filter((element) => element !== '')
  .join('\n');

const formattingPlain = (diff) => stringifyDiff(diff, '');

export default formattingPlain;
