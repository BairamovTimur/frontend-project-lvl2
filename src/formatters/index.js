import _ from 'lodash';
import formattingStylish from './stylish.js';
import formattingPlain from './plain.js';

const formatters = {
  stylish: formattingStylish,
  plain: formattingPlain,
  json: JSON.stringify,
};

const formatting = (data, format) => {
  if (!_.has(formatters, format)) {
    throw new Error(`Unknown format '${format}'`);
  }

  return formatters[format](data);
};

export default formatting;
