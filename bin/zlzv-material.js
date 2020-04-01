#! /usr/bin/env node

const program = require('commander')
program
  .action((obj) => {
    console.log(obj)
  })
program.parse(process.argv)
