export function PreviewActionBar({ note, onDeleteNote, onPinNote }) {
   return <div>
      <button className="fas fa-trash-alt" onClick={(ev) => onDeleteNote(ev, note.id)}></button>
      <button className={`fas fa-thumbtack ${(!note.isPinned) ? 'unpinned' : ''}`} onClick={(ev) => onPinNote(ev, note.id)}></button>
   </div >
}