import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getObjFromFile = (pathToFile) => {
  try {
    const PathToFileNormalize = path.normalize(pathToFile);
    const absPathToFile = path.resolve(PathToFileNormalize);
    const data = fs.readFileSync(absPathToFile);
    const obj = JSON.parse(data);
    return obj;
  } catch (err) {
    console.error(err);
  }
  return undefined;
};

const getDiffObject = (dataBefore, dataAfter) => {
  const propertyBefore = Object.keys(dataBefore);
  const propertyAfter = Object.keys(dataAfter);
  const allProperty = _.uniq(propertyBefore.concat(propertyAfter));

  const diff = allProperty.map((property) => {
    if (!Object.prototype.hasOwnProperty.call(dataBefore, property)) {
      return `+ ${property}: ${dataAfter[property]}`;
    }
    if (!Object.prototype.hasOwnProperty.call(dataAfter, property)) {
      return `- ${property}: ${dataBefore[property]}`;
    }
    if (dataBefore[property] === dataAfter[property]) {
      return `  ${property}: ${dataBefore[property]}`;
    }
    const add = `+ ${property}: ${dataAfter[property]}`;
    const remove = `- ${property}: ${dataBefore[property]}`;
    return [add, remove];
  }).flat().join('\n');

  return `{\n${diff}\n}`;
};

const getDiff = (pathToFile1, pathToFile2) => {
  const dataFile1 = getObjFromFile(pathToFile1);
  const dataFile2 = getObjFromFile(pathToFile2);
  const diff = getDiffObject(dataFile1, dataFile2);
  return diff;
};

export default getDiff;
