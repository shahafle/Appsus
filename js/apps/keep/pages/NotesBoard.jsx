import { noteService } from "../services/note.service.js"
import { Loader } from "../../../cmps/Loader.jsx"
import { DynamicPreview } from "../cmps/dynamic-note-preview/DynamicPreview.jsx";
import { ComposeNote } from "../cmps/ComposeNote.jsx";
import { Screen } from "../../../cmps/Screen.jsx";

const { Route } = ReactRouterDOM

export class NotesBoard extends React.Component {
   state = {
      notes: null,
      filterBy: null
   }

   componentDidMount() {
      let currSearch = new URLSearchParams(this.props.location.search).get('search');
      currSearch = (currSearch === null) ? '' : currSearch;
      this.setState((prevState) => ({
         filterBy: { ...prevState.filterBy, 'name': currSearch }
      }), this.loadNotes)
   }

   componentDidUpdate(prevProps) {
      if (new URLSearchParams(prevProps.location.search).get('search') !== new URLSearchParams(this.props.location.search).get('search')) {
         let currSearch = new URLSearchParams(this.props.location.search).get('search');
         currSearch = (currSearch === null) ? '' : currSearch;
         this.setState((prevState) => ({
            filterBy: { ...prevState.filterBy, 'name': currSearch }
         }), this.loadNotes)
      }
   }

   loadNotes = () => {
      noteService.query(this.state.filterBy)
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
   }

   onAddNote = (rawNote) => {
      return noteService.addNote(rawNote)
         .then(note => {
            if (note.info)
               this.setState(prevState => ({ ...prevState, notes: [...prevState.notes, note] }))
            console.log('note:', note);

            this.onAlertMsg('note-add')

         })
         .catch(err => { return Promise.reject(err) })
   }

   onDeleteNote = (ev, noteId) => {
      ev.stopPropagation()
      noteService.deleteNote(noteId)
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
   }

   onPinNote = (ev, noteId) => {
      ev.preventDefault()
      noteService.toggleNotePin(noteId)
         .then(({ notes, isPinned }) => {
            this.setState(prevState => ({ ...prevState, notes }))
            this.onAlertMsg('note-pinned', isPinned)
         })
   }

   onDuplicateNote = (ev, noteId) => {
      ev.preventDefault()
      noteService.duplicateNote(noteId)
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
      this.onAlertMsg('note-dupl')
   }

   onColorNote = (ev, noteId, color) => {
      ev.preventDefault()
      noteService.colorNote(noteId, color)
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
      this.onAlertMsg('note-color')
   }

   onAlertMsg = (msgType, isPinned) => {
      const Toast = Swal.mixin({
         toast: true,
         position: 'bottom-end',
         showConfirmButton: false,
         timer: 2500,
         timerProgressBar: true,
      })
      let txt = ''
      let icon = ''
      if (msgType === 'note-add') {
         txt = 'Note created',
            icon = 'success'
      } else if (msgType === 'note-pinned') {
         txt = (isPinned) ? 'Note pinned' : 'Note unpinned',
            icon = ''
      } else if (msgType === 'note-dupl') {
         txt = 'Note duplicated',
            icon = ''
      }
      Toast.fire({
         icon: icon,
         title: txt
      })
   }

   render() {
      const { notes } = this.state
      if (!notes) return <Loader />
      return <main className="main-layout">
         <ComposeNote onAddNote={this.onAddNote} />
         <div className="notes-board">
            {notes.map(note => <DynamicPreview key={note.id} note={note} onDeleteNote={this.onDeleteNote}
               onPinNote={this.onPinNote} onDuplicateNote={this.onDuplicateNote} onColorNote={this.onColorNote} />)}
            {/* {notes.map(note => <Route component={ } />)} */}

         </div>
         <Screen />
      </main>
   }
}