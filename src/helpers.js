import _ from 'lodash';

const getFunction = (functions, type, errorText) => {
  if (!_.has(functions, type)) {
    throw new Error(`${errorText} '${type}'`);
  }

  return functions[type];
};

export default getFunction;
