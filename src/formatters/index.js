import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';
import getFunction from '../helpers.js';

const formatters = {
  stylish: stylishFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};

const formatting = (data, format) => {
  const errorText = 'Unknown format';
  const func = getFunction(formatters, format, errorText);

  return func(data);
};

export default formatting;
