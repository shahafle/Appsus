import { Loader } from "../../../../cmps/Loader.jsx";
import { PreviewActionBar } from "../PreviewActionBar.jsx";

const { Link } = ReactRouterDOM

export function ImgNotePreview(props) {

   const { note, onDeleteNote, onPinNote } = props
   if (!note) return <Loader />
   return <Link to={`/keep/note/${note.id}`}>
      <div className="note-preview img-note-preview">
         <img src={note.info.url} />
         <h3>{note.info.title}</h3>
      </div>
      <PreviewActionBar note={note} onDeleteNote={onDeleteNote} onPinNote={onPinNote} />
   </Link>
}