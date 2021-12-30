import { Loader } from "../../../../cmps/Loader.jsx"

export class ImgNoteDetails extends React.Component {
   render() {
      const { note } = this.props
      if (!note) return <Loader />
      return <div className="note-details img-note-details main-layout">
         <h2>{note.info.title}</h2>
         <img src={note.info.url} />
      </div>
   }
}