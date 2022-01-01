import { Loader } from "../../../../cmps/Loader.jsx"

export class ImgNoteDetails extends React.Component {
   render() {
      const { note, handleEdit, onSaveEdit } = this.props
      if (!note) return <Loader />
      return <main className="note-details img-note-details main-layout">
         <h2 contentEditable="true"
            data-name="title"
            suppressContentEditableWarning={true}
            onBlur={({ target }) => handleEdit(target)}
         >{note.info.title}</h2>
         <img src={note.info.url} />
         <button
            onClick={onSaveEdit}
         >Save</button>
      </main>
   }
}