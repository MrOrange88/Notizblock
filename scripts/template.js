function getNoteTemplate(indexNote) {
  return `
  <div class="note">
      <h3>${allNotes.notesTitles[indexNote]}</h3>
      <p>${allNotes.notes[indexNote]}</p> 
      <div>
          <button class="btn" onclick="moveNote(${indexNote}, 'notes', 'trashNotes')">X</button>
          <button class="btn" onclick="moveNote(${indexNote}, 'notes', 'archivNotes')">A</button>
      </div>
  </div>
  `;
}

function getArchivNoteTemplate(indexArchivNote) {
  return `
  <div class="note">
      <h3>${allNotes.archivNotesTitles[indexArchivNote]}</h3>
      <p>${allNotes.archivNotes[indexArchivNote]}</p> 
      <div>
          <button class="btn" onclick="moveNote(${indexArchivNote}, 'archivNotes', 'trashNotes')">X</button>
          <button class="btn" onclick="moveNote(${indexArchivNote}, 'archivNotes', 'notes')">N</button>
      </div>
  </div>
  `;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `
  <div class="note">
      <h3>${allNotes.trashNotesTitles[indexTrashNote]}</h3>
      <p>${allNotes.trashNotes[indexTrashNote]}</p> 
      <div>
          <button class="btn" onclick="deleteNote(${indexTrashNote})">X</button>
          <button class="btn" onclick="moveNote(${indexTrashNote}, 'trashNotes', 'notes')">N</button>
      </div>
  </div>
  `;
}
