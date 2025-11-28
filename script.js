let notesTitles = ["Lebensmittel", "Aufgabe", "Aufgabe"];
let notes = ["Banane", "Auto waschen", "einkaufen gehen"];

let trashNotesTitles = [];
let trashNotes = [];

let archiveNotesTitles = [];
let archiveNotes = [];

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}
function renderTrashNotes() {
  let trashContentRef = document.getElementById("input_trash");
  trashContentRef.innerHTML = "";

  for (let trashNote = 0; trashNote < trashNotes.length; trashNote++) {
    trashContentRef.innerHTML += getTrashNoteTemplate(trashNote);
  }
}

function getNoteTemplate(indexNote) {
  return `<p>${notesTitles[indexNote]} -> ${notes[indexNote]} <button class="btn" onclick="noteToTrash(${indexNote})">X</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `<p>${trashNotesTitles[indexTrashNote]} -> ${trashNotes[indexTrashNote]} <button class="btn" onclick="deleteNote()">X</button></p>`;
}

function addNoteTitle() {
  let noteTitleInputRef = document.getElementById("noteTitle_input");
  let noteTitleInput = noteTitleInputRef.value;

  notesTitles.push(noteTitleInput);

  renderNotes();

  noteTitleInputRef.value = "";
}

function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value;

  notes.push(noteInput);

  renderNotes();

  noteInputRef.value = "";
}

function noteToTrash(indexNote) {
  let trashNote = notes.splice(indexNote, 1);
  trashNotes.push(trashNote[0]);
  let trashNoteTitle = notesTitles.splice(indexNote, 1);
  trashNotesTitles.push(trashNoteTitle[0]);

  renderNotes();
  renderTrashNotes();
}

function deleteNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);

  renderNotes();
  renderTrashNotes();
}
