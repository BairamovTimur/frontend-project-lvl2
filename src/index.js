import program from 'commander';
import genDifference from './genDifference.js';

const getDiff = () => {
  program.version('0.0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((pathtoFile1, pathtoFile2) => {
      const diff = genDifference(pathtoFile1, pathtoFile2, program.format);
      console.log(diff);
    })
    .parse(process.argv);
};

export default getDiff;
