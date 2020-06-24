import _ from 'lodash';

const isNumberOrBoolean = (value) => Number.isNaN(Number(value));

const presentValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (isNumberOrBoolean(value)) {
    return `'${value}'`;
  }
  return value;
};

const getStartedLine = (property) => `Property '${property}' was`;

const getTextLine = (element, property) => {
  if (element.type === 'changed') {
    const addValue = presentValue(element.addValue);
    const delValue = presentValue(element.delValue);
    return `${getStartedLine(property)} changed from ${delValue} to ${addValue}`;
  }
  if (element.type === 'add') {
    const value = presentValue(element.value);
    return `${getStartedLine(property)} added with value: ${value}`;
  }
  if (element.type === 'del') {
    return `${getStartedLine(property)} deleted`;
  }
  return '';
};

const plainFormatter = (diff, pathProperty = '') => diff
  .map((element) => {
    const separator = pathProperty === '' ? '' : '.';
    const propertyElement = `${pathProperty}${separator}${element.key}`;
    if (element.type === 'nested') {
      return plainFormatter(element.children, propertyElement);
    }
    return getTextLine(element, propertyElement);
  })
  .filter((element) => element !== '')
  .join('\n');

export default plainFormatter;
