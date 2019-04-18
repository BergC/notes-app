// Importing our modules.
const chalk = require('chalk'),
    yargs = require('yargs'),
    getNotes = require('./notes.js');

// Customize yargs verion.
yargs.version('1.1.0');

// Create add command.
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true, // Requires title input.  By default demandOption is set to false.
            type: 'string' // Ensures that the title input is a string.
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        console.log('Title: ' + argv.title);
        console.log('Body: ' + argv.body);
    }
});

// Create remove command.
yargs.command({
    command: 'remove',
    describe: 'Remove an old note',
    handler: function() {
        console.log('Remove an old note.');
    }
});

// Create list command.
yargs.command({
    command: 'list',
    describe: 'List our notes',
    handler: function() {
        console.log('List our notes.');
    }
});

// Create read command.
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler: function() {
        console.log('Reading a note.');
    }
});

yargs.parse();