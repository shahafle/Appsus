import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
   query,
   getNoteById,
   addNote,
   toggleTodoChecked,
   deleteNote,
   toggleNotePin,
   updateNote,
   duplicateNote,
   colorNote
}

const KEY = 'NotesDB';

_createNotes()

function query(filterBy) {
   let notes = _loadNotesFromStorage()
   if (!filterBy) return Promise.resolve(notes);
   return Promise.resolve(_getFilteredNotes(notes, filterBy.name))
}

function _getFilteredNotes(notes, searchLine) {
   searchLine = searchLine.toLowerCase();
   return notes.filter(note => {
      if (note.type === 'txt') return (note.info.title.toLowerCase().includes(searchLine) ||
         note.info.txt.toLowerCase().includes(searchLine))
      if (note.type === 'img') return (note.info.title.toLowerCase().includes(searchLine))
      if (note.type === 'todos') return (note.info.title.toLowerCase().includes(searchLine) ||
         note.info.todos.some(todo => todo.txt.toLowerCase().includes(searchLine)))
   })
}


function _createNotes() {
   let notes = _loadNotesFromStorage();
   if (!notes || !notes.length) {
      notes = [{
         id: utilService.makeId(),
         type: "txt",
         isPinned: false,
         info: {
            title: 'hi',
            txt: "Fullstack Me Baby!"
         },
         backgroundColor: '#d5e3d7'
      },
      {
         id: utilService.makeId(),
         type: "img",
         isPinned: false,
         info: {
            title: "Bobi and Me",
            url: "https://hellodesign.co/wp-content/uploads/2020/11/UX-hello-design.jpg"
         },
         backgroundColor: '#d5e3d7'
      },
      {
         id: utilService.makeId(),
         type: "todos",
         isPinned: false,
         info: {
            title: "Get my stuff together",
            todos: [
               { txt: "Driving liscence", doneAt: null },
               { txt: "Coding power", doneAt: 187111111 }
            ]
         },
         // backgroundColor: '#ececec'
         backgroundColor: '#d5e3d7'
      }];
   }
   _saveNotesToStorage(notes);
}


function _loadNotesFromStorage() {
   return storageService.loadFromStorage(KEY);
}

function _saveNotesToStorage(books) {
   storageService.saveToStorage(KEY, books);
}

function getNoteById(noteId) {
   const notes = _loadNotesFromStorage();
   const note = notes.find(note => note.id === noteId);
   return Promise.resolve(note);
}

function addNote(note) {
   const { fields, type } = note
   let info = { title: fields.title };
   switch (type) {
      case 'txt':
         if (!fields.txt && !fields.title) return Promise.reject('Insert content please')
         info.txt = fields.txt
         break;
      case 'img':
         if (!fields.url) return Promise.reject('Insert image url please')
         info.url = fields.url
         break;
      case 'todos':

         if (fields.todos.length === 1 && !fields.todos[0]) return Promise.reject('Insert todos please')
         fields.todos.pop();
         info.todos = fields.todos.map(todo => ({ txt: todo }))
         break;
   }
   console.log('hiush');
   const formattedNote = {
      id: utilService.makeId(),
      type,
      isPinned: false,
      info,
      backgroundColor: '#d5e3d7'
   }
   const notes = _loadNotesFromStorage();
   notes.push(formattedNote);
   _saveNotesToStorage(notes);
   return Promise.resolve(formattedNote);
}

function toggleTodoChecked(noteId, todoIdx) {
   const notes = _loadNotesFromStorage();
   const note = notes.find(note => note.id === noteId);
   const { todos } = note.info;
   todos[todoIdx].doneAt = (todos[todoIdx].doneAt) ? null : Date.now();
   _saveNotesToStorage(notes);
   return Promise.resolve(note);
}


function getNoteById(noteId) {
   const notes = _loadNotesFromStorage();
   const note = notes.find(note => note.id === noteId);
   return Promise.resolve(note);
}

function deleteNote(noteId) {
   const notes = _loadNotesFromStorage();
   const noteIdx = notes.findIndex(note => note.id === noteId);
   notes.splice(noteIdx, 1);
   _saveNotesToStorage(notes);
   return Promise.resolve(notes);
}

function toggleNotePin(noteId) {
   const notes = _loadNotesFromStorage();
   const noteIdx = notes.findIndex(note => note.id === noteId);
   notes[noteIdx].isPinned = !notes[noteIdx].isPinned;
   sortNotes(notes)
   _saveNotesToStorage(notes);
   return Promise.resolve({ notes, isPinned:notes[noteIdx].isPinned });
}

function sortNotes(notes) {
   return notes.sort((n1, n2) => { return (!n1.isPinned && n2.isPinned) ? 1 : -1 })
}

function updateNote(newNote) {
   const notes = _loadNotesFromStorage();
   const noteIdx = notes.findIndex(note => note.id === newNote.id);
   notes.splice(noteIdx, 1, newNote);
   _saveNotesToStorage(notes);
}


function duplicateNote(noteId) {
   const notes = _loadNotesFromStorage();
   return getNoteById(noteId)
      .then(note => {
         note.id = utilService.makeId();
         notes.push(note)
         _saveNotesToStorage(notes);

         return notes;
      })
}

function colorNote(noteId, color) {
   const notes = _loadNotesFromStorage();
   const note = notes.find(note => note.id === noteId);
   note.backgroundColor = color;
   _saveNotesToStorage(notes);
   return Promise.resolve(notes);
}