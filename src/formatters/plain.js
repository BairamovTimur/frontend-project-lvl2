import _ from 'lodash';

const presentValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
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

const formattingPlain = (diff) => {
  const iter = (difference, pathProperty) => difference
    .map((element) => {
      const separator = pathProperty === '' ? '' : '.';
      const propertyElement = `${pathProperty}${separator}${element.key}`;

      if (element.type === 'nested') {
        return iter(element.children, propertyElement);
      }

      return getTextLine(element, propertyElement);
    })
    .filter((element) => element !== '')
    .join('\n');

  return iter(diff, '');
};

export default formattingPlain;
