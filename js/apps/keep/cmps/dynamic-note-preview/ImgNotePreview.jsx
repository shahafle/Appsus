import { Loader } from "../../../../cmps/Loader.jsx"

const { Link } = ReactRouterDOM

export class ImgNotePreview extends React.Component {
   render() {
      const { note } = this.props
      if (!note) return <Loader />
      return <Link to={`/keep/note/${note.id}`}>
         <div className="note-preview img-note-preview">
            <img src={note.info.url} />
            <h3>{note.info.title}</h3>
         </div>
      </Link>
   }
}