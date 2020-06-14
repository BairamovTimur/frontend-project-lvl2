#!/usr/bin/env node
import program from 'commander';
import getDiff from '../src/genDifference.js';

program.version('0.0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format', 'pretty')
  .action((pathtoFile1, pathtoFile2) => {
    const diff = getDiff(pathtoFile1, pathtoFile2);
    console.log(diff);
  })
  .parse(process.argv);

export default getDiff;
