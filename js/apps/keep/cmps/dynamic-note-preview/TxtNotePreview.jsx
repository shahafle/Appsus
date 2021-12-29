import { Loader } from "../../../../cmps/Loader.jsx"

export class TxtNotePreview extends React.Component {
   render() {
      const { note } = this.props
      if (!note) return <Loader />
      return <div className="note-preview txt-note-preview">
         <h3>{note.info.txt}</h3>
      </div>
   }
}