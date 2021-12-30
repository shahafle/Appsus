import { Loader } from "../../../../cmps/Loader.jsx"
import { noteService } from "../../services/note.service.js"

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

   onToggleTodoChecked = (noteId, todoIdx) => {
      console.log(noteId);
      noteService.toggleTodoChecked(noteId, todoIdx)
         .then(note => {
            this.setState({ note })
         })
   }


   test = (ev, noteId, todoIdx) => {
      ev.stopPropagation()
      // ev.preventDefault()
      noteService.toggleTodoChecked(noteId, todoIdx)
      // .then(note => {
      //    const newNote = JSON.parse(JSON.stringify(note));
      //    setTimeout(() => this.setState({ note: newNote }), 5)
      // })
   }
   stam = () => { }

   render() {
      const { note } = this.state
      if (!note) return <Loader />
      console.log(note);
      return <Link to={`/keep/note/${note.id}`}>
         <div className="note-preview  todo-note-preview ">
            <h3>{note.info.label}</h3>
            <ul>
               {note.info.todos.map((todo, i) => {
                  console.log(todo.doneAt);
                  return <li key={i}>
                     <input
                        type="checkbox"
                        id={'todo ' + i}
                        onChange={() => this.onToggleTodoChecked(note.id, i)}
                        onClick={(ev) => this.test(ev, note.id, i)}
                     />
                     <label
                        htmlFor={'todo ' + i} >{todo.txt}</label>
                  </li>
               })}
            </ul>
         </div>
      </Link>
   }
}