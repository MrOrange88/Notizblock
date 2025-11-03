let notes = ["Banane", "Auto waschen", "einkaufen gehen"];
let trashNotes = [];

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
  return `<p>+ ${notes[indexNote]}<button onclick="deleteNote(${indexNote})">X</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `<p>+ ${trashNotes[indexTrashNote]}<button onclick="deleteNote(${indexTrashNote})">X</button></p>`;
}

function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value;

  notes.push(noteInput);

  renderNotes();

  noteInputRef.value = "";
}

function deleteNote(indexNote) {
  let trashNote = notes.splice(indexNote, 1);
  trashNotes.push(trashNote);
  renderNotes();
  renderTrashNotes();
}
