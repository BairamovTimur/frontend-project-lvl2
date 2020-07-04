import _ from 'lodash';
import yaml from 'js-yaml';
import parseIni from './ini.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

const parse = (data, format) => {
  const errorText = 'Unknown format data';

  if (!_.has(parsers, format)) {
    throw new Error(`${errorText} '${format}'`);
  }

  return parsers[format](data);
};

export default parse;
