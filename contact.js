#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
require('dotenv').config()

const { 
  addContact, 
  getContact, 
  addMultipleContacts, 
  getContactList,
  updateContact,
  deleteContact,
  sendEmailToContact 
} = require('./logic'); 

const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Contact\'s firstname ..'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Contact\'s lastname ..'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Contact\'s phone number ..'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Contact\'s email address ..'
  }

];

const sendEmailQuestions = [
  {
    type : 'input',
    name : 'subject',
    message : 'Subject ...'
  }, 
  {
    type : 'input',
    name : 'message',
    message : 'Message/Body ...'
  }
];

program
  .version('0.0.1')
  .description('Contact management system')

program
  .command('addContact')
  .alias('a')
  .description('Add a contact')
  .action(() => {
    prompt(questions).then((answers) =>
      addContact(answers));
  });

program
  .command('getContact <name>')
  .alias('r')
  .description('Get contact')
  .action(name => getContact(name));

program
  .command('updateContact <_id>')
  .alias('u')
  .description('Update contact')
  .action(_id => {
    prompt(questions).then((answers) =>
      updateContact(_id, answers));
  });

program
  .command('deleteContact <_id>')
  .alias('d')
  .description('Delete contact')
  .action(_id => deleteContact(_id));

program
  .command('getContactList')
  .alias('l')
  .description('List contacts')
  .action(() => getContactList());

program
  .command('sendEmail <_id>')
  .alias('s')
  .description('Send email to contact')
  .action(_id => {
    prompt(sendEmailQuestions).then((answers) => 
      sendEmailToContact(_id, answers));
  });


// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudls]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv)
    