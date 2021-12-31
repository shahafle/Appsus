import { Loader } from "../../../../cmps/Loader.jsx"

export function TxtNoteDetails({ note, handleEdit, onSaveEdit }) {
   if (!note) return <Loader />
   return <div className="note-details txt-note-details main-layout">
      <h3 contentEditable="true"
         data-name="title"
         suppressContentEditableWarning={true}
         onBlur={({ target }) => handleEdit(target)}
      >{note.info.title}</h3>

      <p contentEditable="true"
         data-name="txt"
         suppressContentEditableWarning={true}
         onBlur={({ target }) => handleEdit(target)}
      >{note.info.txt}</p>
      <button
         onClick={onSaveEdit}
      >Save</button>
   </div>
}