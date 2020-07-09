const getSpaces = (depth) => {
  const indentToLevel = 4;

  return ' '.repeat(depth * indentToLevel);
};

const stringifyValue = (value, depth) => {
  if (typeof (value) !== 'object') {
    return value;
  }

  const presentation = Object.entries(value)
    .map(([key, val]) => `${key}: ${stringifyValue(val, depth)}`)
    .join('\n');
  const indent = getSpaces(depth);

  return `{\n  ${indent}  ${presentation}\n${indent}}`;
};

const getLine = (key, value, prefix, depth) => {
  const indent = getSpaces(depth);

  return `  ${indent}${prefix}${key}: ${stringifyValue(value, depth + 1)}`;
};

const mapping = {
  nested: (node, depth, iter) => {
    const presentChildren = iter(node.children, depth + 1);

    return getLine(node.key, presentChildren, '  ', depth);
  },
  changed: (node, depth) => {
    const added = getLine(node.key, node.addedValue, '+ ', depth);
    const deleted = getLine(node.key, node.deletedValue, '- ', depth);

    return `${deleted}\n${added}`;
  },
  added: (node, depth) => getLine(node.key, node.value, '+ ', depth),
  deleted: (node, depth) => getLine(node.key, node.value, '- ', depth),
  equal: (node, depth) => getLine(node.key, node.value, '  ', depth),
};

const iter = (diff, depth = 0) => {
  const indent = getSpaces(depth);
  const result = diff
    .map((node) => mapping[node.type](node, depth, iter)).join('\n');

  return `{\n${result}\n${indent}}`;
};

const formatStylish = (diff) => iter(diff);

export default formatStylish;
