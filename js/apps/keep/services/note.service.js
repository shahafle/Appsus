import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
   query
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


function _saveNotesToStorage(books) {
   storageService.saveToStorage(KEY, books);
}

function _loadNotesFromStorage() {
   return storageService.loadFromStorage(KEY);
}
