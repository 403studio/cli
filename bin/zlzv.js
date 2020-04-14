#! /usr/bin/env node

const program = require('commander')
const { addMaterial } = require('../src/material')
const { initProject } = require('../src/init')

program
  .version(require('../package.json').version)
  .command('material', 'Material operation')

// 项目初始化
program.command('init [projectName]')
  .description('Init an project')
  .action((projectName) => {
    initProject(projectName)
  })
// 物料安装
program.command('add [materialName] [targetName]')
  .description('Add material to project')
  .action((materialName, targetName) => {
    addMaterial(materialName, targetName)
  })

program.parse(program.argv)
