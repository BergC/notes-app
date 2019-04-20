// Importing our modules.
const chalk = require('chalk'),
    yargs = require('yargs'),
    notes = require('./notes.js');

// Customize yargs version.
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
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// Create remove command.
yargs.command({
    command: 'remove',
    describe: 'Remove an old note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

// Create list command.
yargs.command({
    command: 'list',
    describe: 'List our notes',
    handler() {
        console.log('List our notes.');
    }
});

// Create read command.
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler() {
        console.log('Reading a note.');
    }
});

yargs.parse();