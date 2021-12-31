export function DetailsActionBar({ email, onToggleAttributes, onBackToMailBox }) {

    return <div className="email-details-action-bar flex align-center">
        <button className="fas fa-arrow-left clear-button" onClick={() =>onBackToMailBox()} ></button>
        <button className="fas fa-trash-alt clear-button" onClick={() => onToggleAttributes(email.id, 'trash')} ></button>
        <button className={`${(email.isStarred) ? 'fas' : 'far'} fa-star clear-button`} onClick={() => onToggleAttributes(email.id, 'star')} ></button>
        <button className={` fas fa-envelope${(email.isRead) ? '-open' : ''} clear-button`} onClick={() => onToggleAttributes(email.id, 'read')} ></button>
        
    </div >
}