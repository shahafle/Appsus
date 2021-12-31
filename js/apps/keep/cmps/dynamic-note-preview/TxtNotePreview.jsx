import { Loader } from "../../../../cmps/Loader.jsx";
import { PreviewActionBar } from "../PreviewActionBar.jsx";

const { Link } = ReactRouterDOM

export class TxtNotePreview extends React.Component {
   render() {
      const { note, onDeleteNote, onPinNote } = this.props
      if (!note) return <Loader />
      return <Link to={`/keep/note/${note.id}`}>
         <div className="note-preview txt-note-preview flex column">
            <h3>{note.info.title}</h3>
            <p>{note.info.txt}</p>
            <PreviewActionBar note={note} onDeleteNote={onDeleteNote} onPinNote={onPinNote} />
         </div>
      </Link>
   }
}