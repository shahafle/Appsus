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
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
   }

   onDuplicateNote = (ev, noteId) => {
      ev.preventDefault()
      noteService.duplicateNote(noteId)
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
   }

   onColorNote = (ev, noteId, color) => {
      ev.preventDefault()
      noteService.colorNote(noteId, color)
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
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