import { Loader } from "../../../../cmps/Loader.jsx"

export class TxtNoteDetails extends React.Component {
   render() {
      const { note } = this.props
      if (!note) return <Loader />
      return <div className="note-details txt-note-details main-layout">
         <h3>{note.info.title}</h3>
         <p>{note.info.txt}</p>
      </div>
   }
}