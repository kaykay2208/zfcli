#!/usr/bin/env node
const { program } = require('commander');
const generateGrant = require('./modules/generateGrant');
const {createFunction,updateFunction}=require('./modules/func');

// const persistToken = require('./modules/persistToken');

// Define CLI commands
program
.command('hello')
.action(()=>{
  console.log("hello")
});

program
  .command('register')
  .description('Generates grant token and refresh token')
  .action(() => {
    generateGrant.generateGrant();
  });

  program
  .command('function <orgId>')
  .description('Creates or edits a function and stores zip')
  .option('-c, --create', 'Create a function')
  .option('-e, --edit', 'Edit a function')
  .action((orgID,options) => {
    if (options.create) {
      createFunction(orgID);
    } else if (options.edit) {
       updateFunction(orgID);
    } else {
      console.error('Please specify either --create or --edit');
    }
  });

program.parse(process.argv);
