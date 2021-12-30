import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
   query,
   getNoteById,
   addNote,
   toggleTodoChecked
}

const KEY = 'NotesDB';

_createNotes()

function query() {
   const notes = _loadNotesFromStorage()
   return Promise.resolve(notes);
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
            label: "Get my stuff together",
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
   const noteType = (note.imgUrl) ? 'img' : 'txt';
   const formattedNote = {
      id: utilService.makeId(),
      type: noteType,
      isPinned: false,
      info: {
         url: note.imgUrl,
         title: note.title,
         txt: note.txt
      },
      style: {
         backgroundColor: 'khaki'
      }
   }
   console.log(formattedNote);
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