import { Loader } from "../../../../cmps/Loader.jsx";
import { PreviewActionBar } from "../PreviewActionBar.jsx";

export class TxtNotePreview extends React.Component {
   render() {
      const { note, onOpenNote } = this.props
      if (!note) return <Loader />
      return <div className="note-preview txt-note-preview flex column" style={{ backgroundColor: note.backgroundColor }} onClick={() => onOpenNote(note.id)}>
         <h3>{note.info.title}</h3>
         <p>{note.info.txt}</p>
         <PreviewActionBar {...this.props} />
      </div>
   }
}