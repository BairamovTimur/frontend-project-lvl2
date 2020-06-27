import parseIni from './ini.js';
import parseJson from './json.js';
import parseYaml from './yaml.js';
import getFunction from '../helpers.js';

const parsers = {
  json: parseJson,
  yml: parseYaml,
  ini: parseIni,
};

const parse = (data, format) => {
  const errorText = 'Unknown format file';
  const func = getFunction(parsers, format, errorText);

  return func(data);
};

export default parse;
