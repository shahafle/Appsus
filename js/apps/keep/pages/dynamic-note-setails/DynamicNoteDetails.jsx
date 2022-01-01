import { noteService } from '../../services/note.service.js';
import { TxtNoteDetails } from './TxtNoteDetails.jsx'
import { ImgNoteDetails } from './ImgNoteDetails.jsx'
import { TodoNoteDetails } from './TodoNoteDetails.jsx'

export class DynamicNoteDetails extends React.Component {
   state = {
      note: null
   }
   componentDidMount() {
      const { noteId } = this.props.match.params;
      noteService.getNoteById(noteId).then(note => {
         if (!note) {
            this.props.history.push('/keep/board')
            return;
         }
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

   handleEdit = (target, todoIdx) => {
      if (typeof todoIdx === 'number') {
         const { todos } = this.state.note.info
         todos[todoIdx].txt = target.innerText;
         this.setState(prevState => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos } } }))
      }
      else this.setState(prevState => ({ note: { ...prevState.note, info: { ...prevState.note.info, [target.dataset.name]: target.innerText } } }))
   }

   onDeleteTodo = (todoIdx) => {
      let { todos } = this.state.note.info
      todos.splice(todoIdx, 1);
      this.setState(prevState => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos } } }))
   }

   onNewTodo = () => {
      this.setState(prevState => ({ note: { ...prevState.note, info: { ...prevState.note.info, todos: [...prevState.note.info.todos, { txt: 'new' }] } } }))
   }

   onSaveEdit = () => {
      noteService.updateNote(this.state.note)
      this.onAlertMsg()
   }


   onAlertMsg = () => {
      const Toast = Swal.mixin({
         toast: true,
         position: 'bottom-end',
         showConfirmButton: false,
         timer: 2500,
         timerProgressBar: true,
      })
    
      Toast.fire({
         icon: 'success',
         title:'Note successfully edited'
      })
   }

   render() {
      const { note } = this.state
      if (!note) return <React.Fragment></React.Fragment>

      switch (note.type) {
         case 'txt':
            return <TxtNoteDetails note={note} handleEdit={this.handleEdit} onToggleTodoChecked={this.onToggleTodoChecked} onSaveEdit={this.onSaveEdit} />
         case 'img':
            return <ImgNoteDetails note={note} handleEdit={this.handleEdit} onToggleTodoChecked={this.onToggleTodoChecked} onSaveEdit={this.onSaveEdit} />
         case 'todos':
            return <TodoNoteDetails note={note} handleEdit={this.handleEdit} onToggleTodoChecked={this.onToggleTodoChecked}
               onSaveEdit={this.onSaveEdit} onDeleteTodo={this.onDeleteTodo} onNewTodo={this.onNewTodo} />
      }
   }
}