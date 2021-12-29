import { Loader } from "../../../../cmps/Loader.jsx"

export class ImgNotePreview extends React.Component {
   render() {
      const { note } = this.props
      if (!note) return <Loader />
      return <div className="note-preview img-note-preview">
         <h3>{note.info.title}</h3>
         <img src={note.info.url} />
      </div>
   }
}