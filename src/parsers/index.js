import _ from 'lodash';
import parseIni from './ini.js';
import parseJson from './json.js';
import parseYaml from './yaml.js';

const parsers = {
  json: parseJson,
  yml: parseYaml,
  ini: parseIni,
};

const parse = (data, format) => {
  if (!_.has(parsers, format)) {
    throw new Error(`Unknown format file '${format}'`);
  }
  return parsers[format](data);
};

export default parse;
