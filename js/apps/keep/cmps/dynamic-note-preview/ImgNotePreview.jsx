import { Loader } from "../../../../cmps/Loader.jsx";
import { PreviewActionBar } from "../PreviewActionBar.jsx";

export function ImgNotePreview(props) {
   const { onOpenNote, note } = props
   if (!note) return <Loader />
   return <div className="note-preview img-note-preview" style={{ backgroundColor: note.backgroundColor }} onClick={() => onOpenNote(note.id)}>
      <img src={note.info.url} />

      <div className="img-note-preview-details flex column">
         <h3>{note.info.title}</h3>
         <PreviewActionBar {...props} />
      </div>
   </div>

}