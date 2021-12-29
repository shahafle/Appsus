import { noteService } from "../services/note.service.js"
import { Loader } from "../../../cmps/Loader.jsx"
import { DynamicPreview } from "../cmps/dynamic-note-preview/DynamicPreview.jsx";

export class NotesBoard extends React.Component {
   state = {
      notes: null
   }

   componentDidMount() {
      this.loadNotes();
   }

   loadNotes = () => {
      noteService.query()
         .then(notes => this.setState({ notes }))
   }

   render() {
      const { notes } = this.state
      if (!notes) return <Loader />
      return <main className="notes-board">
         {notes.map(note => <DynamicPreview key={note.id} note={note} />)}
      </main>
   }
}