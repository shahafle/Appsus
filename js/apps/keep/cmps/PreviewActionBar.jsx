import { ColorInput } from "./ColorInput.jsx";

export function PreviewActionBar({ note, onDeleteNote, onPinNote, onDuplicateNote, onColorNote }) {
   return <div className="preview-actions-bar flex">
      <button className={`fas fa-thumbtack ${(!note.isPinned) ? 'unpinned' : 'pinned'}`} onClick={(ev) => onPinNote(ev, note.id)}></button>
      <button className="fas fa-trash-alt" onClick={(ev) => onDeleteNote(ev, note.id)}></button>
      <button className="fas fa-copy" onClick={(ev) => onDuplicateNote(ev, note.id)}></button>
      <ColorInput noteId={note.id} onColorNote={onColorNote} />
   </div >
}