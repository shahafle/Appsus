import { utilService } from "../../../services/util.service.js";
import { EmailService } from "../services/mail.service.js"
import { Loader } from "../../../cmps/Loader.jsx";

export class EmailDetails extends React.Component {

    state = {
        email: null,
    }


    componentDidMount() {
        this.loadEmail()
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params
        EmailService.getEmailById(emailId).then((email) => {
            this.setState({ email })
        })
    }

    onBackToMailBox = () => {
        this.props.history.push('/mail/mail_box')
    }

    onToggleAttributes = (emailId, attribute) => {
        EmailService.toggleEmailAttributes(emailId, attribute).then(email => {
            this.setState({ email })
            // this.onToggleAttributesModal(attribute)
            if(attribute === 'trash')this.props.history.push('/mail/mail_box')
        })
    }


    render() {
        const { email } = this.state
        if (!email) return <Loader/>


        return (

            <section className="email-details">
                <button className="fas fa-arrow-left fa-lg" onClick={() => this.props.history.push('/mail/mail_box')}></button>
                <button className="fas fa-trash-alt fa-lg clear-button" onClick={() => this.onToggleAttributes(email.id, 'trash')} ></button>
                <button className={`${(this.state.email.isStarred) ? 'fas' : 'far'} fa-star fa-lg clear-button`} onClick={() => this.onToggleAttributes(email.id, 'star')} ></button>
                <button className={` fas fa-envelope${(this.state.email.isRead) ? '-open' : ''} fa-lg clear-button`} onClick={() => this.onToggleAttributes(email.id, 'read')}></button>
                <p>{utilService.getDate(email.sentAt)}</p>
                <div className="email-details-container flex column">
                    <div>{email.subject}</div>
                    <div>
                        <p>{email.from.userName} {`<${email.from.address}>`}</p>
                    </div>
                    <div>{email.body}</div>
                </div>
            </section>

        )

    }


}