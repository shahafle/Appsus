import { TxtNotePreview } from './TxtNotePreview.jsx'
import { ImgNotePreview } from './ImgNotePreview.jsx'
import { TodoNotePreview } from './TodoNotePreview.jsx'

export function DynamicPreview({ note }) {
   switch (note.type) {
      case 'txt':
         return <TxtNotePreview note={note} />
      case 'img':
         return <ImgNotePreview note={note} />
      case 'todos':
         return <TodoNotePreview note={note} />
   }
}