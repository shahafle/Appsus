import { Loader } from "../../../../cmps/Loader.jsx"
import { PreviewActionBar } from "../../cmps/PreviewActionBar.jsx"

export function TodoNoteDetails(props) {
   const { note, onToggleTodoChecked, handleEdit, onSaveEdit, onDeleteTodo, onNewTodo } = props
   if (!note) return <Loader />
   return <main className="note-details todo-note-details flex column" style={{ backgroundColor: note.backgroundColor }}>
      <h3
         contentEditable="true"
         data-name="title"
         onBlur={({ target }) => handleEdit(target)}
         suppressContentEditableWarning={true}
      >{note.info.title}</h3>
      <ul className="flex column">
         {note.info.todos.map((todo, i) => {
            return <li key={i} className="flex">

               <button
                  onClick={(ev) => onToggleTodoChecked(ev, note.id, i)}
                  className={`fas fa${(todo.doneAt) ? '-check' : ''}-circle`}
               >
               </button>
               <label
                  className={(todo.doneAt) ? 'checked' : ''}
                  contentEditable="true"
                  onBlur={({ target }) => handleEdit(target, i)}
                  suppressContentEditableWarning={true}
               >{todo.txt}</label>
               <button onClick={() => onDeleteTodo(i)} className="far fa-times-circle"></button>
            </li>
         })}

         <button
            onClick={onNewTodo}
            className="notes-primary-btn"
         >Add</button>
      </ul>



      <button
         onClick={onSaveEdit}
         className="notes-primary-btn"
      >Save</button>
      <PreviewActionBar {...props} />
   </main>

}