import { Loader } from "../../../../cmps/Loader.jsx";
import { PreviewActionBar } from "../PreviewActionBar.jsx";

const { Link } = ReactRouterDOM

export function ImgNotePreview(props) {
   const { note } = props
   if (!note) return <Loader />
   return <Link to={`/keep/note/${note.id}`}>
      <div className="note-preview img-note-preview" style={{ backgroundColor: note.backgroundColor }}>
         <img src={note.info.url} />

         <div className="img-note-preview-details flex column">
            <h3>{note.info.title}</h3>
            <PreviewActionBar {...props} />
         </div>
      </div>
   </Link >
}