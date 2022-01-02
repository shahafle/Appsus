import { Loader } from "../../../../cmps/Loader.jsx"
import { PreviewActionBar } from "../../cmps/PreviewActionBar.jsx"

export function TxtNoteDetails(props) {
   const { note, handleEdit, onSaveEdit } = props
   if (!note) return <Loader />
   return <main className="note-details txt-note-details flex column" style={{ backgroundColor: note.backgroundColor }}>
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
         className="notes-primary-btn"
         onClick={onSaveEdit}
      >Save</button>
      <PreviewActionBar {...props} />
   </main>
}