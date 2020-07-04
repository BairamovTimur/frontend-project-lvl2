import _ from 'lodash';
import yaml from 'js-yaml';
import parseIni from './ini.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

const parse = (data, formatData) => {
  if (!_.has(parsers, formatData)) {
    throw new Error(`Unknown format data '${formatData}'`);
  }

  return parsers[formatData](data);
};

export default parse;
