import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
   query
}

const KEY = 'NotesDB';

_createNotes()

function query() {
   return _loadNotesFromStorage()
}


function _createNotes() {
   let notes = _saveNotesToStorage();
   if (!notes || !notes.length) {
      notes = [{
         id: utilService.makeId(),
         type: "txt",
         isPinned: true,
         info: {
            txt: "Fullstack Me Baby!"
         }
      },
      {
         id: utilService.makeId(),
         type: "note-img",
         info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
         },
         style: {
            backgroundColor: "#00d"
         }
      },
      {
         id: utilService.makeId(),
         type: "note-todos",
         info: {
            label: "Get my stuff together",
            todos: [
               { txt: "Driving liscence", doneAt: null },
               { txt: "Coding power", doneAt: 187111111 }
            ]
         }
      }];
   }
   _loadNotesFromStorage(notes);
}


function _saveNotesToStorage(books) {
   storageService.saveToStorage(KEY, books);
}

function _loadNotesFromStorage() {
   return storageService.loadFromStorage(KEY);
}
