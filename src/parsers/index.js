import _ from 'lodash';
import parseIni from './ini.js';
import parseJson from './json.js';
import parseYaml from './yaml.js';

const parsers = {
  json: parseJson,
  yml: parseYaml,
  ini: parseIni,
};

const parse = (data, formatFile) => {
  if (!_.has(parsers, formatFile)) {
    throw new Error(`Unknown format file '${formatFile}'`);
  }
  return parsers[formatFile](data);
};

export default parse;
