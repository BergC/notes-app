const fs = require('fs'),
    chalk = require('chalk');

const getNotes = () => 'Your notes...';

// Functionality to add a note.
const addNote = (title, body) => {
    const notes = loadNotes();

    // Ensure a note with the input title doesn't already exist.
    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
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

// Functionality to save a note.
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

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
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}