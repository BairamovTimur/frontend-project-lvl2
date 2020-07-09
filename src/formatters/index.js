import _ from 'lodash';
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

const format = (data, outputFormat) => {
  if (!_.has(formatters, outputFormat)) {
    throw new Error(`Unknown format '${outputFormat}'`);
  }

  return formatters[outputFormat](data);
};

export default format;
