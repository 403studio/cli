#! /usr/bin/env node
require('dotenv').config()
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const shell = require('shelljs')

exports.addMaterial = function (name, targetName) {
  const questions = [
    {
      type: 'input',
      name: 'materialName',
      message: '请输入物料名称'
    },
    {
      type: 'list',
      name: 'position',
      message: '请选择物料安装位置全局目录(global)还是当前目录(lobal)',
      choices: ['global', 'local']
    }
  ]
  if (name) questions.shift()

  inquirer
    .prompt(questions)
    .then(({
      materialName,
      position
    }) => {
      if (name) materialName = name
      if (!targetName) targetName = materialName
      console.log(process.env.MATERIAL_REPOSITORY_URL)
      console.log(chalk.green('正在构建中......'))
      const pwd = shell.pwd()
      shell.rm('-rf', '.material')
      shell.mkdir('.material')
      shell.cd('.material')
      const spinner = ora('物料仓库正在初始化').start()
      shell.exec('git init', { silent: true })
      shell.exec(`git remote add origin ${process.env.MATERIAL_REPOSITORY_URL}`)
      shell.exec('git config core.sparseCheckout true')
      const materialFilePath = `packages/${materialName}/*`
      shell.exec(`echo ${materialFilePath} >> .git/info/sparse-checkout`)
      if (shell.exec(`git pull origin ${process.env.MATERIAL_REPOSITORY_BRANCH}`, { silent: true }).code !== 0) {
        spinner.fail(chalk.red('从远程仓库拉取物料信息失败，请检查网络或者物料是否存在'))
        shell.cd('../')
        shell.rm('-rf', '.material')
        shell.exit(1)
      }

      spinner.succeed(chalk.green('物料获取成功'))
      shell.cd('../')
      if (shell.test('-d', `${pwd}/src/components/${targetName}`)) {
        // shell.cp('-rn', `.material/${materialFilePath}`, `${pwd}/components/${materialName}`)
        spinner.fail(chalk.red(`在目录${pwd}/components下已经存在${materialName}同名组件信息`))
      } else {
        shell.mkdir('-p', `${pwd}/src/components/${targetName}`)
        shell.cp('-r', `.material/${materialFilePath}`, `${pwd}/components/${targetName}`)
        spinner.succeed(chalk.green('物料添加成功'))
      }
    })
}
