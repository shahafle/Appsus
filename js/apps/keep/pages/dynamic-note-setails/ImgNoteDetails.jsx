import { Loader } from "../../../../cmps/Loader.jsx"
import { PreviewActionBar } from "../../cmps/PreviewActionBar.jsx"

export function ImgNoteDetails(props) {
   const { note, handleEdit, onSaveEdit } = props
   if (!note) return <Loader />
   return <main className="note-details img-note-details flex column" style={{ backgroundColor: note.backgroundColor }}>
      <h3 contentEditable="true"
         data-name="title"
         suppressContentEditableWarning={true}
         onBlur={({ target }) => handleEdit(target)}
      >{note.info.title}</h3>
      <img src={note.info.url} />
      <button
         className="notes-primary-btn"
         onClick={onSaveEdit}
      >Save</button>
      <PreviewActionBar {...props} />
   </main>

}