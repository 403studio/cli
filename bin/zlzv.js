#! /usr/bin/env node

const program = require('commander')
const { addMaterial } = require('../src/material')

program
  .version(require('../package.json').version)
  .command('material', 'Material operation')

program.command('add [materialName] [targetName]')
  .description('Add material to project')
  .action((materialName, targetName) => {
    addMaterial(materialName, targetName)
  })

program.parse(program.argv)
