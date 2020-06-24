import yaml from 'js-yaml';

const parseYaml = (data) => yaml.safeLoad(data);

export default parseYaml;
