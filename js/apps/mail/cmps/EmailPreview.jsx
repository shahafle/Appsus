import { MailService as EmailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    state = {
        email: null,
    }

    componentDidMount() {
        this.setState({ email: this.props.email })
    }





    onToggleAttributes = (emailId, attribute) => {
        EmailService.toggleEmailAttributes(emailId, attribute).then(email => {

            this.setState({ email })
        })
    }





    render() {
        const { email } = this.state
        if (!email) return <React.Fragment></React.Fragment>

        return (
            <section className={`email-preview flex inbox-${email.id}`}>

                <button className={`${(this.state.email.isStared) ? 'fas' : 'far'} fa-star fa-lg clear-button`} onClick={() => this.onToggleAttributes(email.id, 'star')} ></button>
                <button className={` fas fa-envelope${(this.state.email.isRead) ? '-open' : ''} fa-lg clear-button`} onClick={() => this.onToggleAttributes(email.id, 'read')}></button>
                <Link className="clean-link" to={`/mail/mail_box/${this.state.email.id}`}>
                    <p>{email.from.userName}</p>
                    <p>{email.subject}</p>
                    <p>{email.body}</p>
                </Link>

            </section >
        )


    }


}