import { Loader } from "../../../../cmps/Loader.jsx"
import { noteService } from "../../services/note.service.js"
import { PreviewActionBar } from "../PreviewActionBar.jsx"

const { Link } = ReactRouterDOM

export class TodoNotePreview extends React.Component {
   state = {
      note: null
   }


   componentDidMount() {
      this.loadNote()
   }

   loadNote = () => {
      const noteId = this.props.note.id;
      noteService.getNoteById(noteId).then(note => {
         this.setState({ note })
      })
   }

   onToggleTodoChecked = (ev, noteId, todoIdx) => {
      ev.preventDefault()
      // ev.stopPropagation()
      noteService.toggleTodoChecked(noteId, todoIdx)
         .then(note => {
            this.setState({ note })
         })
   }

   render() {
      const { onDeleteNote, onPinNote } = this.props
      const { note } = this.state
      if (!note) return <Loader />
      return <Link to={`/keep/note/${note.id}`}>
         <div className="note-preview  todo-note-preview ">
            <h3>{note.info.title}</h3>
            <ul>
               {note.info.todos.map((todo, i) => {
                  return <li key={i}>
                     <button
                        onClick={(ev) => this.onToggleTodoChecked(ev, note.id, i)}
                        className={`fas fa${(todo.doneAt) ? '-check' : ''}-circle`}
                     >
                     </button>
                     <label
                        className={(todo.doneAt) ? 'checked' : ''}
                        onClick={(ev) => this.onToggleTodoChecked(ev, note.id, i)}
                     >{todo.txt}</label>
                  </li>
               })}
            </ul>
            <PreviewActionBar note={this.props.note} onDeleteNote={onDeleteNote} onPinNote={onPinNote} />
         </div>
      </Link >
   }
}