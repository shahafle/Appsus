import { Loader } from "../../../../cmps/Loader.jsx"

export class TxtNoteDetails extends React.Component {
   render() {
      const { note } = this.props
      if (!note) return <Loader />
      return <div className="note-details txt-note-details">
         <h3>Details</h3>
      </div>
   }
}