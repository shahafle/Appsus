import { noteService } from '../../services/note.service.js';
import { TxtNoteDetails } from './TxtNoteDetails.jsx'
import { ImgNoteDetails } from './ImgNoteDetails.jsx'
import { TodoNoteDetails } from './TodoNoteDetails.jsx'

export class DynamicNoteDetails extends React.Component {
   state = {
      note: null
   }
   componentDidMount() {

      const { noteId } = this.props.match.params;
      noteService.getNoteById(noteId).then(note => {
         if (!note) {
            this.props.history.push('/keep/board')
            return;
         }
         this.setState({ note })
      })
   }

   render() {
      const { note } = this.state
      if (!note) return <React.Fragment></React.Fragment>

      switch (note.type) {
         case 'txt':
            return <TxtNoteDetails note={note} />
         case 'img':
            return <ImgNoteDetails note={note} />
         case 'todos':
            return <TodoNoteDetails note={note} />
      }
   }
}