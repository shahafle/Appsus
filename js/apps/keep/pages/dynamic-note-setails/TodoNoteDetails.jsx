import { Loader } from "../../../../cmps/Loader.jsx"

export function TodoNoteDetails({ note, onToggleTodoChecked, handleEdit, onSaveEdit, onDeleteTodo, onNewTodo }) {

   if (!note) return <Loader />
   return <main className="note-details  todo-note-details main-layout">
      <h3
         contentEditable="true"
         data-name="title"
         onBlur={({ target }) => handleEdit(target)}
         suppressContentEditableWarning={true}
      >{note.info.title}</h3>
      <ul>
         {note.info.todos.map((todo, i) => {
            return <li key={i}>

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
               <button onClick={() => onDeleteTodo(i)}>X</button>
            </li>
         })}
      </ul>

      <button
         onClick={onNewTodo}
      >Add</button>

      <button
         onClick={onSaveEdit}
      >Save</button>
   </main>

}