let notesTitles = ["Lebensmittel", "Aufgabe", "Aufgabe"];
let notes = ["Banane", "Auto waschen", "einkaufen gehen"];

let trashNotesTitles = [];
let trashNotes = [];

let archivNotesTitles = [];
let archivNotes = [];

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}
function renderArchivNotes() {
  let archivContentRef = document.getElementById("archiv_content");
  archivContentRef.innerHTML = "";

  for (
    let indexArchivNote = 0;
    indexArchivNote < archivNotes.length;
    indexArchivNote++
  ) {
    archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
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
  return `
  <div class="note">
      <h3>${notesTitles[indexNote]}</h3>
      <p>${notes[indexNote]}</p> 
      <div>
          <button class="btn" onclick="noteToTrash(${indexNote})">X</button>
          <button class="btn" onclick="noteToArchiv(${indexNote})">A</button>
      </div>
  </div>
  `;
}

function getArchivNoteTemplate(indexArchivNote) {
  return `
  <div class="note">
      <h3>${archivNotesTitles[indexArchivNote]}</h3>
      <p>${archivNotes[indexArchivNote]}</p> 
      <div>
          <button class="btn" onclick="archivNoteToTrash(${indexArchivNote})">X</button>
          <button class="btn" onclick="archivToNote(${indexArchivNote})">N</button>
      </div>
  </div>
  `;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `
  <div class="note">
      <h3>${trashNotesTitles[indexTrashNote]}</h3>
      <p>${trashNotes[indexTrashNote]}</p> 
      <div>
          <button class="btn" onclick="deleteNote(${indexTrashNote})">X</button>
          <button class="btn" onclick="trashToNote(${indexTrashNote})">N</button>
      </div>
  </div>
  `;
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

function noteToArchiv(indexNote) {
  const note = notes.splice(indexNote, 1)[0];
  const title = notesTitles.splice(indexNote, 1)[0];

  archivNotes.push(note);
  archivNotesTitles.push(title);

  renderNotes();
  renderArchivNotes();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const data = {
    notes,
    notesTitles,
    trashNotes,
    trashNotesTitles,
    archivNotes,
    archivNotesTitles,
  };
  localStorage.setItem("notesAppData", JSON.stringify(data));
}

function getFromLocalStorage() {
  const raw = localStorage.getItem("notesAppData");
  if (!raw) return;

  const data = JSON.parse(raw);
  notes = data.notes || [];
  notesTitles = data.notesTitles || [];
  trashNotes = data.trashNotes || [];
  trashNotesTitles = data.trashNotesTitles || [];
  archivNotes = data.archivNotes || [];
  archivNotesTitles = data.archivNotesTitles || [];
}

function archivNoteToTrash(indexArchivNote) {
  const note = archivNotes.splice(indexArchivNote, 1)[0];
  const title = archivNotesTitles.splice(indexArchivNote, 1)[0];

  trashNotes.push(note);
  trashNotesTitles.push(title);

  renderArchivNotes();
  renderTrashNotes();
  saveToLocalStorage();
}

function archivToNote(indexArchivNote) {
  const note = archivNotes.splice(indexArchivNote, 1)[0];
  const title = archivNotesTitles.splice(indexArchivNote, 1)[0];

  notes.push(note);
  notesTitles.push(title);

  renderArchivNotes();
  renderNotes();
  saveToLocalStorage();
}

function trashToNote(indexTrashNote) {
  let trashNote = trashNotes.splice(indexTrashNote, 1);
  notes.push(trashNote[0]);
  let trashNoteTitle = trashNotesTitles.splice(indexTrashNote, 1);
  notesTitles.push(trashNoteTitle[0]);

  renderTrashNotes();
  renderNotes();
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
  trashNotesTitles.splice(indexTrashNote, 1);

  renderTrashNotes();
  saveToLocalStorage();
}
