let allNotes = {
  notesTitles: ["Ba"],
  notes: ["banana"],
  archivNotesTitles: [],
  archivNotes: [],
  trashNotesTitles: [],
  trashNotes: [],
};

function init() {
  getFromLocalStorage();
  renderNotes();
  renderArchivNotes();
  renderTrashNotes();
}

function moveNote(indexNote, startKey, destinationKey) {
  const [note] = allNotes[startKey].splice(indexNote, 1);
  allNotes[destinationKey].push(note);

  const [title] = allNotes[startKey + "Titles"].splice(indexNote, 1);
  allNotes[destinationKey + "Titles"].push(title);

  renderArchivNotes();
  renderTrashNotes();
  renderNotes();
  saveToLocalStorage();
}

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < allNotes.notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderArchivNotes() {
  let archivContentRef = document.getElementById("archiv_content");
  archivContentRef.innerHTML = "";

  for (
    let indexArchivNote = 0;
    indexArchivNote < allNotes.archivNotes.length;
    indexArchivNote++
  ) {
    archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
  }
}

function renderTrashNotes() {
  let trashContentRef = document.getElementById("input_trash");
  trashContentRef.innerHTML = "";

  for (let trashNote = 0; trashNote < allNotes.trashNotes.length; trashNote++) {
    trashContentRef.innerHTML += getTrashNoteTemplate(trashNote);
  }
}

function addNewNote() {
  const titleInputRef = document.getElementById("noteTitle_input");
  const noteInputRef = document.getElementById("note_input");

  const title = titleInputRef.value.trim();
  const text = noteInputRef.value.trim();

  if (!title && !text) {
    return;
  }

  allNotes.notesTitles.push(title || "Ohne Titel");
  allNotes.notes.push(text || "");

  renderNotes();
  saveToLocalStorage();

  titleInputRef.value = "";
  noteInputRef.value = "";
}

function noteToArchiv(indexNote) {
  moveNote(indexNote, "notes", "archivNotes");
}

function saveToLocalStorage() {
  localStorage.setItem("notesAppData", JSON.stringify(allNotes));
}

function getFromLocalStorage() {
  const raw = localStorage.getItem("notesAppData");
  if (!raw) return;

  const data = JSON.parse(raw);

  allNotes.notes = data.notes || [];
  allNotes.notesTitles = data.notesTitles || [];
  allNotes.trashNotes = data.trashNotes || [];
  allNotes.trashNotesTitles = data.trashNotesTitles || [];
  allNotes.archivNotes = data.archivNotes || [];
  allNotes.archivNotesTitles = data.archivNotesTitles || [];
}

function deleteNote(indexTrashNote) {
  allNotes.trashNotes.splice(indexTrashNote, 1);
  allNotes.trashNotesTitles.splice(indexTrashNote, 1);

  renderNotes();
  renderTrashNotes();
  renderArchivNotes();
  saveToLocalStorage();
}
