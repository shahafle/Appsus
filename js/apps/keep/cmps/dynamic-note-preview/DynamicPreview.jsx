import { TxtNotePreview } from './TxtNotePreview.jsx'
import { ImgNotePreview } from './ImgNotePreview.jsx'
import { TodoNotePreview } from './TodoNotePreview.jsx'

export function DynamicPreview({ note }) {
   const { type } = note;
   switch (type) {
      case 'txt':
         return <TxtNotePreview note={note} />
      case 'img':
         return <ImgNotePreview note={note} />
      case 'todos':
         return <TodoNotePreview note={note} />
   }
}