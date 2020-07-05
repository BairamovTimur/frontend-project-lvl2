import _ from 'lodash';

const getDiffProperty = (key, data1, data2) => {
  if (!_.has(data1, key)) {
    return { key, value: data2[key], type: 'added' };
  }
  if (!_.has(data2, key)) {
    return { key, value: data1[key], type: 'deleted' };
  }
  if (data1[key] === data2[key]) {
    return { key, value: data1[key], type: 'equal' };
  }

  return {
    key, addedValue: data2[key], deletedValue: data1[key], type: 'changed',
  };
};

const buildTreeDiff = (obj1, obj2) => _.union(Object.keys(obj1), Object.keys(obj2))
  .map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: buildTreeDiff(obj1[key], obj2[key]), type: 'nested' };
    }

    return getDiffProperty(key, obj1, obj2);
  });

export default buildTreeDiff;
