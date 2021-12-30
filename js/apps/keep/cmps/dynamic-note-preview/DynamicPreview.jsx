import { TxtNotePreview } from './TxtNotePreview.jsx'
import { ImgNotePreview } from './ImgNotePreview.jsx'
import { TodoNotePreview } from './TodoNotePreview.jsx'

export function DynamicPreview(props) {
   switch (props.note.type) {
      case 'txt':
         return <TxtNotePreview {...props} />
      case 'img':
         return <ImgNotePreview {...props} />
      case 'todos':
         return <TodoNotePreview {...props} />
   }
}