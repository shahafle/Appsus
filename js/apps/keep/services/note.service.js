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
            title: 'קוקוריקו',
            txt: `
            אוקיי אוקיי, קוקוריקו תרנגול, קוקוריקו קול גדול
            אם יש ספק אז יש פה גדילה פוטנציאלית ועכשיו הזמן לתת את הכל
            מה שחשבתי חשבתי, שבתי כמו רוח, נשבתי מה שאהבתי, עודני כמו ביום שנולדתי
            קמתי, חזרתי, פיזרתי מילים על מילים וצלילים שמצאתי, הרבה כבוד לפצצתי
            מעבר לעובדה שחייתי את ההיפ־הופ ברחם
            תוך כדי תנועה נולד על קצב, רגע של קסם
            מעבר לשבר, לחדר, התדר עושה את שלו בכל מובן אפשרי
            גן־עדן זה עניין של תפיסת תודעה, לא דרך או רצון נקמה
            קוקוריקו, זאת קריאת השכמה, תשמע
            אין לי רצון למתכת, רק להרגיש אדמה
            תן לי לבוא וללכת, רק לנגן אהבה
            מעבר לעובדה שכל הנוגעים בדבר הם חלק בלתי נפרד ממני, מעצם היותי
            מעבר לכל החומות שכביכול מפרידות, יש אתכם ואותי
            אז אל תדליקו אותי (אל תדליקו אותו)
            עוד שנייה אני מתהפך פה על כולם
            (עוד שנייה הוא מתהפך פה על כולם, בואנ'ה אל תדליקו אותו)
            רבאק אל תדליקו אותי (אז אל תדליקו אותו)
            וואלק עוד שנייה אני מתהפך פה על כולם (הוא מתהפך פה על כולם)
            אני מתהפך פה על כולם (הוא מתהפך פה על כולם)
            אז אל תדליקו אותי`
         },
         backgroundColor: '#d5e3d7'
      },
      {
         id: utilService.makeId(),
         type: "img",
         isPinned: false,
         info: {
            title: "Welcome to Trinity notes",
            url: "https://hellodesign.co/wp-content/uploads/2020/11/UX-hello-design.jpg"
         },
         backgroundColor: '#d5e3d7'
      },
      {
         id: utilService.makeId(),
         type: "img",
         isPinned: false,
         info: {
            title: "טונה - המערב הפרוע",
            url: "https://upload.wikimedia.org/wikipedia/he/c/c1/%D7%9E%D7%96%D7%A8%D7%97_%D7%A4%D7%A8%D7%95%D7%A2.png"
         },
         backgroundColor: '#fbe7c6'
      },
      {
         id: utilService.makeId(),
         type: "todos",
         isPinned: false,
         backgroundColor: '#b2d8e5',
         info: {
            title: "To do list",
            todos: [
               { txt: "Keep my self together", doneAt: 187111111 },
               { txt: "Coding power", doneAt: 187111111 },
               { txt: "Clean the dishes", doneAt: null },
               { txt: "Call the doctor", doneAt: null },
               { txt: "learn to play: Texas Flood, Stevie Ray Vaughn", doneAt: null },
               { txt: "Write and amazing mail&note application", doneAt: 187111111 },
               
            ]
         },
         backgroundColor: '#b2d8e5'
      },
      {
         id: utilService.makeId(),
         type: "img",
         isPinned: false,
         info: {
            title: "Patterns patterns",
            url: "https://image.shutterstock.com/image-vector/three-dimensional-maze-perfectly-repeatable-260nw-1465124336.jpg"
         },
         backgroundColor: '#d5e3d7'
      },
      {
         id: utilService.makeId(),
         type: "img",
         isPinned: false,
         info: {
            title: "james webb space telescope",
            url: "https://ingeniumcanada.org/sites/default/files/2021-11/nouvelles-20200716-jwst.jpg"
         },
         backgroundColor: '#fbe7c6'
      },
      {
         id: utilService.makeId(),
         type: "txt",
         isPinned: false,
         info: {
            title: 'Texas Flood',
            txt: `
            Well it's floodin' down in Texas
            All of the telephone lines are down
            Well it's floodin' down in Texas
            All of the telephone lines are down
            And I've been tryin' to call my baby
            Lord and I can't get a single sound
            Well dark clouds are rollin' in
            Man I'm standin' out in the rain
            Well dark clouds are rollin' in
            Man I'm standin' out in the rain
            Yeah flood water keep a rollin'
            Man it's about to drive poor me insane
            Well I'm leavin' you baby
            Lord and I'm goin' back home to stay
            Well I'm leavin' you baby
            Lord and I'm goin' back home to stay
            Well back home I know floods and tornados
            Baby the sun shines every day
            `
         },
         backgroundColor: '#d5e3d7'
      },
      {
         id: utilService.makeId(),
         type: "img",
         isPinned: false,
         info: {
            title: "רביד פלוטניק - תוך כדי תנועה",
            url: "https://upload.wikimedia.org/wikipedia/he/c/c1/%D7%A8%D7%91%D7%99%D7%93_%D7%A4%D7%9C%D7%95%D7%98%D7%A0%D7%99%D7%A7_-_%D7%AA%D7%95%D7%9A_%D7%9B%D7%93%D7%99_%D7%AA%D7%A0%D7%95%D7%A2%D7%94.jpg"
         },
         backgroundColor: '#ffaebc'
      },
   
   
   ];
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