import { Loader } from "../../../../cmps/Loader.jsx"

export class TodoNotePreview extends React.Component {
   render() {
      const { note } = this.props
      console.log(note);
      if (!note) return <Loader />
      return <div className="note-preview  todo-note-preview ">
         <h3>{note.info.label}</h3>
         <ul>
            {note.info.todos.map((todo, i) => {
               return <li key={i}>
                  <input type="checkbox" id={'todo ' + i} />
                  <label htmlFor={'todo ' + i}>{todo.txt}</label>
               </li>
            })}
         </ul>
      </div>
   }
}