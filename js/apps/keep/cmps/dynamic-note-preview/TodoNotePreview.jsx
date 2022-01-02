import { Loader } from "../../../../cmps/Loader.jsx"
import { noteService } from "../../services/note.service.js"
import { PreviewActionBar } from "../PreviewActionBar.jsx"


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
      noteService.toggleTodoChecked(noteId, todoIdx)
         .then(note => {
            this.setState({ note })
         })
   }

   render() {
      const { note } = this.state
      if (!note) return <Loader />
      return <div className="note-preview todo-note-preview flex column" style={{ backgroundColor: this.props.note.backgroundColor }} onClick={() => this.props.onOpenNote(note.id)}>
         <h3>{note.info.title}</h3>
         <ul>
            {note.info.todos.map((todo, i) => {
               return <li key={i} className="flex">
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
         <PreviewActionBar {...this.props} />
      </div>
   }
}