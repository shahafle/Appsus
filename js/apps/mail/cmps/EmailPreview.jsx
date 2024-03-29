import { utilService } from "../../../services/util.service.js";
import { EmailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"
import { Loader } from "../../../cmps/Loader.jsx";

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    state = {
        email: null,
    }

    componentDidMount() {
        this.setState({ email: this.props.email })
    }

    onToggleAttributes = (ev, emailId, attribute) => {
        ev.preventDefault()
        if (this.state.email.isTrashed && attribute === 'trash') {
            attribute = 'delete'
            this.onDeleteMsg(emailId, attribute)
            return
        } else {
            EmailService.toggleEmailAttributes(emailId, attribute)
                .then(email => {
                    this.setState({ email })
                    eventBusService.emit('update-read-count', this.onUpdateReadCount)
                    this.onToggleAttributesMsg(attribute)
                    this.props.loadEmails()
                })
        }
    }

    onDeleteMsg = (emailId, attribute) => {
        Swal.fire({
            title: 'Delete this Email?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3E65AD',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-right',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    })
                    EmailService.toggleEmailAttributes(emailId, attribute)
                        .then(email => {
                            eventBusService.emit('update-read-count', this.onUpdateReadCount)
                            this.setState({ email })
                            this.props.loadEmails()
                        })
                    Toast.fire({
                        title: 'Email deleted',
                        icon: 'success'
                    })
                }
            })
    }


    onToggleAttributesMsg = (attribute) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        let txt = ''
        if (attribute === 'star') {
            txt = (this.state.email.isStarred) ? '⭐Email Starred' : 'Email Unstarred'
        } else if (attribute === 'read') {
            txt = (this.state.email.isRead) ? 'Email marked as Read' : 'Email marked as unread'
        } else if (attribute === 'trash') {
            txt = 'Email moved to trash'
        } else if (attribute === 'restore') {
            txt = 'Email was restored'
        }
        Toast.fire({
            title: txt
        })
    }

    render() {
        const { email } = this.state
        const { loggedInUser } = this.props

        if (!email) return <Loader />

        return (
            <Link className="clean-link" to={`/mail/mail_box/${email.id}`}>
                <section className={`${(email.isRead) ? 'preview-read' : ''} email-preview flex align-center justify-center`}>
                    <div className="preview-action-btns align-start justify-center">
                        <button
                            className="fas fa-trash-alt fa-lg clear-button" onClick={(ev) => this.onToggleAttributes(ev, email.id, 'trash')} >
                        </button>
                        <button
                            className={`${(email.isStarred) ? 'fas' : 'far'} fa-star fa-lg clear-button`}
                            onClick={(ev) => this.onToggleAttributes(ev, email.id, 'star')} >
                        </button>
                        <button
                            className={` fas fa-envelope${(email.isRead) ? '-open' : ''} fa-lg clear-button`}
                            onClick={(ev) => this.onToggleAttributes(ev, email.id, 'read')}>
                        </button>
                        {email.isTrashed && <button className="restore-trashed-email fas fa-trash-restore-alt fa-lg clear-button" onClick={(ev) => this.onToggleAttributes(ev, email.id, 'restore')} ></button>}
                    </div>
                    <div className="flex flex-grow1 email-preview-info">

                        {(email.from.address !== loggedInUser.address) && < div className="email-username">{email.from.userName}</div>}
                        {(email.from.address === loggedInUser.address) && <div className="email-username">To: {email.to.userName}</div>}
                        <div className="flex email-content-preview">
                            <p className="email-subject">{email.subject}</p>
                            <p className="email-body">{email.body}</p>
                        </div>
                    </div>
                    <div className="email-date ">{utilService.getDate(email.sentAt)}</div>

                </section >
            </Link >
        )


    }


}