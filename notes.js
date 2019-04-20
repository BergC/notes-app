const fs = require('fs'),
    chalk = require('chalk');

// Functionality to add a note.
const addNote = (title, body) => {
    const notes = loadNotes();

    // Ensure a note with the input title doesn't already exist.
    //const duplicateNotes = notes.filter((note) => note.title === title);
    const ducplicateNote = notes.find((note) => notes.title === title); // .find() method is better than .filter() because it will stop running as soon as a duplicate is found whereas .filter() will continue looking through the remainder of the array.

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);

        console.log(chalk.bgGreen('New note added!'));
    } else {
        console.log(chalk.bgRed('Note title taken'));
    }
}

// Functionality to remove a note based on a provided title.
const removeNote = (title) => {
    const notes = loadNotes();

    const retainedNotes = notes.filter((note) => note.title !== title);

    if (retainedNotes.length < notes.length) {
        console.log(chalk.bgGreen('Note removed!'));
        saveNotes(retainedNotes); // We only need to save the notes if something has changed (e.g. a note is removed).
    } else {
        console.log(chalk.bgRed('No note found!'));
    }
}

const listNotes = () => {
    console.log(chalk.hex('#DEADED')('Your notes:'));

    const notes = loadNotes();
    notes.forEach((note) => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();

    const noteToRead = notes.find((note) => note.title === title);

    if (noteToRead) {
        console.log(chalk.cyan.underline(noteToRead.title) + chalk.cyan(': ') + noteToRead.body);
        //console.log(noteToRead.body);
    } else {
        console.log(chalk.redBright('Error occurred. No note found. Please check title input.'));
    }
    
}

// Functionality to save a note.
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

// Functionality to list out existing notes by outputting each note title.
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}