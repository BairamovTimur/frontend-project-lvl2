const presentValue = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const getPropertyName = (parent, property) => [...parent, property].join('.');

const mapping = {
  nested: (node, path, iter) => iter(node.children, [...path, node.key]),
  changed: (node, path) => {
    const addedValue = presentValue(node.addedValue);
    const deletedValue = presentValue(node.deletedValue);

    return `Property '${getPropertyName(path, node.key)}' was changed from ${deletedValue} to ${addedValue}`;
  },
  added: (node, path) => {
    const value = presentValue(node.value);
    return `Property '${getPropertyName(path, node.key)}' was added with value: ${value}`;
  },
  deleted: (node, path) => `Property '${getPropertyName(path, node.key)}' was deleted`,
  equal: () => [],
};

const iter = (diff, path) => diff
  .flatMap((node) => mapping[node.type](node, path, iter))
  .join('\n');

const formatPlain = (diff) => iter(diff, []);

export default formatPlain;
