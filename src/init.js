#! /usr/bin/env node
const inquirer = require('inquirer')
const ora = require('ora')
const chalk = require('chalk')
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const download = require('download-git-repo')
const config = require('./config')

exports.initProject = (projectName) => {
  const quesions = [
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名称'
    },
    {
      type: 'list',
      name: 'type',
      message: '请选择项目类型',
      choices: ['PC', 'H5'],
      filter (val) {
        return val.toLowerCase()
      }
    }
  ]
  if (projectName) quesions.shift()

  inquirer
    .prompt(quesions)
    .then(({
      name,
      type
    }) => {
      let checkDir = false
      if (projectName) name = projectName
      const pwd = shell.pwd()
      const spinner = ora('仓库正在初始化').start()
      shell.cd(pwd)
      fs
        .readdirSync(pwd.toString())
        .filter(file => fs.statSync(file).isDirectory())
        .forEach(file => {
          if (file === name) {
            spinner.fail(chalk.red('目录下已存在同名的文件夹，无法再次创建项目目录文件夹'))
            shell.exit(1)
            checkDir = true
          }
        })
      if (!checkDir) {
        const repository = config.TEMPLATE_REPOSITORY_URL
        const destination = path.join(pwd.toString(), name)
        // TODO: 根据类型添加分支名
        download(`direct:${repository}`, destination, { clone: true }, function (error) {
          if (error) {
            spinner.fail(chalk.red(`拉取base工程失败，${error.message}`))
            shell.exit(1)
          } else {
            spinner.succeed(chalk.green('创建成功，请进入项目目录执行npm run install'))
          }
        })
      }
    })
}
