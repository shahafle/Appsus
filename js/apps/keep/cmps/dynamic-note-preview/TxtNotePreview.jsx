import { Loader } from "../../../../cmps/Loader.jsx"

const { Link } = ReactRouterDOM

export class TxtNotePreview extends React.Component {
   render() {
      const { note } = this.props
      if (!note) return <Loader />
      return <Link to={`/keep/note/${note.id}`}>
         <div className="note-preview txt-note-preview">
            <h3>{note.info.title}</h3>
            <p>{note.info.txt}</p>
         </div>
      </Link>
   }
}