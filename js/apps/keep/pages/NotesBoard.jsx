import { noteService } from "../services/note.service.js"
import { Loader } from "../../../cmps/Loader.jsx"
import { DynamicPreview } from "../cmps/dynamic-note-preview/DynamicPreview.jsx";
import { ComposeNote } from "../cmps/ComposeNote.jsx";
import { Screen } from "../../../cmps/Screen.jsx";
import { DynamicNoteDetails } from "./dynamic-note-setails/DynamicNoteDetails.jsx";
import { eventBusService } from "../../../services/event-bus.service.js";

export class NotesBoard extends React.Component {
   state = {
      notes: null,
      filterBy: null,
      openNote: null
   }

   removeEventBus

   componentDidMount() {
      this.removeEventBus = eventBusService.on('closeNoteDetails', () => {
         this.setState({ openNote: null })
      })

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

   componentWillUnmount() {
      this.removeEventBus();
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
            this.onAlertMsg('note-add')

         })
         .catch(err => { return Promise.reject(err) })
   }

   onDeleteNote = (ev, noteId) => {
      ev.stopPropagation()
      this.onDeleteMsg(noteId)
   }

   onPinNote = (ev, noteId) => {
      ev.stopPropagation()
      noteService.toggleNotePin(noteId)
         .then(({ notes, isPinned }) => {
            this.setState(prevState => ({ ...prevState, notes }))
            this.onAlertMsg('note-pinned', isPinned)
         })
   }

   onDuplicateNote = (ev, noteId) => {
      ev.stopPropagation()
      noteService.duplicateNote(noteId)
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
      this.onAlertMsg('note-dupl')
   }

   onColorNote = (ev, noteId, color) => {
      ev.stopPropagation()
      noteService.colorNote(noteId, color)
         .then(notes => this.setState(prevState => ({ ...prevState, notes })))
   }

   onAlertMsg = (msgType, isPinned) => {
      const Toast = Swal.mixin({
         toast: true,
         position: 'top-right',
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
            icon = 'success'
      }
      Toast.fire({
         icon: icon,
         title: txt
      })
   }

   onDeleteMsg = (noteId) => {
      Swal.fire({
         title: 'Delete this note?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#d33',
         cancelButtonColor: '#2f5233',
         confirmButtonText: 'Yes, delete it!'
      })
         .then((result) => {
            if (result.isConfirmed) {
               const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
               })
               noteService.deleteNote(noteId)
                  .then(notes => {
                     this.setState(prevState => ({ ...prevState, notes, openNote: null }))
                     eventBusService.emit('toggleScreen', false);
                  })
               Toast.fire({
                  title: 'Note deleted',
                  icon: 'success'
               })
            }
         })
   }

   onOpenNote = (openNote) => {
      eventBusService.emit('toggleScreen', true);
      this.setState(prevState => ({ ...prevState, openNote }))
   }

   render() {
      const { notes, openNote } = this.state
      if (!notes) return <Loader />
      return <main className="main-layout">
         <ComposeNote onAddNote={this.onAddNote} />
         <div className="notes-board">
            {notes.map(note => <DynamicPreview key={note.id} note={note} onDeleteNote={this.onDeleteNote}
               onPinNote={this.onPinNote} onDuplicateNote={this.onDuplicateNote} onColorNote={this.onColorNote}
               onOpenNote={this.onOpenNote} />)}
         </div>
         {(openNote !== null) && <DynamicNoteDetails noteId={openNote} onDeleteNote={this.onDeleteNote}
            onPinNote={this.onPinNote} onDuplicateNote={this.onDuplicateNote} onColorNote={this.onColorNote} />}
         <Screen />
      </main>
   }
}