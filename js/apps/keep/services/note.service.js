import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
   query,
   getNoteById,
   addNote,
   toggleTodoChecked,
   deleteNote,
   toggleNotePin
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
         style: {
            color: 'khaki'
         }
      },
      {
         id: utilService.makeId(),
         type: "img",
         isPinned: false,
         info: {
            url: "https://hellodesign.co/wp-content/uploads/2020/11/UX-hello-design.jpg",
            title: "Bobi and Me"
         },
         style: {
            backgroundColor: 'khaki'
         }
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
         style: {
            backgroundColor: 'khaki'
         }
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
   console.log(fields);
   let info = { title: fields.title };
   switch (type) {
      case 'txt':
         info.txt = fields.txt
         break;
      case 'img':
         info.url = fields.url
         break;
      case 'todos':
         fields.todos.pop();
         info.todos = fields.todos.map(todo => ({ txt: todo }))
         break;
   }

   const formattedNote = {
      id: utilService.makeId(),
      type,
      isPinned: false,
      info,
      style: {
         backgroundColor: 'khaki'
      }
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
   return Promise.resolve(notes);
}

function sortNotes(notes) {
   return notes.sort((n1, n2) => { return (!n1.isPinned && n2.isPinned) ? 1 : -1 })
}