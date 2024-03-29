import { utilService } from "../../../services/util.service.js";
import { EmailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event-bus.service.js"
import { DetailsActionBar } from "../cmps/DetailsActionBar.jsx";
import { Loader } from "../../../cmps/Loader.jsx";

const { withRouter } = ReactRouterDOM

class _EmailDetails extends React.Component {

    state = {
        email: null,
        loggedInUser: null,
    }

    componentDidMount() {
        this.loadEmail()
        EmailService.getLoggedInUser()
            .then(loggedInUser => {
                this.setState(prevState => ({ ...prevState, loggedInUser }))
            })
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params
        EmailService.getEmailById(emailId)
            .then((email) => {
                this.setState({ email })
            })
    }

    onBackToMailBox = () => {
        this.props.history.goBack()
    }

    onEmailReply = () => {
        eventBusService.emit('init-reply', this.state.email)
    }

    onToggleAttributes = (emailId, attribute) => {
        if (this.state.email.isTrashed && attribute === 'trash') {
            attribute = 'delete'
            this.onDeleteMsg(emailId, attribute)
            return
        } else {
            EmailService.toggleEmailAttributes(emailId, attribute)
                .then(email => {
                    this.setState({ email })
                    this.onToggleAttributesMsg(attribute)
                    eventBusService.emit('update-read-count', this.onUpdateReadCount)
                    if (attribute === 'trash') this.onBackToMailBox()
                })
        }
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
            txt = (this.state.email.isStarred) ? '⭐Email starred' : 'Email unstarred'
        } else if (attribute === 'read') {
            txt = (this.state.email.isRead) ? 'Email marked as read' : 'Email marked as unread'
        } else if (attribute === 'trash') {
            txt = 'Email moved to trash'
        }
        Toast.fire({
            title: txt
        })
    }

    onDeleteMsg = (emailId, attribute) => {
        Swal.fire({
            title: 'Delete this Email?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#21379B',
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
                    EmailService.toggleEmailAttributes(emailId, attribute).then(email => {
                        this.setState({ email })
                        eventBusService.emit('update-read-count', this.onUpdateReadCount)
                        this.onBackToMailBox()
                    })
                    Toast.fire({
                        title: 'Email deleted',
                        icon: 'success'
                    })
                }
            })
    }

    render() {
        const { email, loggedInUser } = this.state
        if (!email || !loggedInUser) return <Loader />
        return (
            <section className="email-details flex column">
                <DetailsActionBar email={email} onToggleAttributes={this.onToggleAttributes} onBackToMailBox={this.onBackToMailBox} />
                <div className="email-details-container flex column ">
                    <div className="details-title-container flex space-between align-center">
                        <p className="email-title">{email.subject}</p>
                        <div className="flex row">
                            {(email.to.address === loggedInUser.address) &&
                                <button className="details-reply fas fa-reply fa-lg clear-button"
                                    onClick={this.onEmailReply}>
                                </button>}
                            <p>{utilService.getDate(email.sentAt)}</p>
                        </div>
                    </div>
                    <div>
                        {(email.from.address !== loggedInUser.address) &&
                            <p className="email-details-from"><span>{email.from.userName}</span> {`<${email.from.address}>`}
                            </p>}
                        {(email.from.address === loggedInUser.address) &&
                            <p className="email-details-to"><span>To: {email.to.userName}</span> {`< ${email.to.address}>`}
                            </p>}

                        <div>{email.body}</div>
                    </div>
                </div>
            </section>
        )
    }
}


export const EmailDetails = withRouter(_EmailDetails)
