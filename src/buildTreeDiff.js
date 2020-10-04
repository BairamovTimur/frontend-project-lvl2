import _ from 'lodash';

const buildTreeDiff = (obj1, obj2) => _.union(Object.keys(obj1), Object.keys(obj2))
  .sort()
  .map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: buildTreeDiff(obj1[key], obj2[key]), type: 'nested' };
    }
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], type: 'equal' };
    }

    return {
      key, addedValue: obj2[key], deletedValue: obj1[key], type: 'changed',
    };
  });

export default buildTreeDiff;
