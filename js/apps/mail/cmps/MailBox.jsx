import { EmailService } from "../services/mail.service.js"
import { EmailPreview } from "./EmailPreview.jsx"

import { Loader } from "../../../cmps/Loader.jsx";

export class MailBox extends React.Component {


    state = {
        emails: [],
        filterBy: null,

    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        EmailService.query().then(emails => {
            this.setState({ emails })
        })
    }



    render() {
        const { emails } = this.state


        if (!emails) return <Loader />
        return (
            <React.Fragment>
                
                <section className="mailbox-container flex column">
                    {emails.map(email => <EmailPreview key={email.id} email={email} onUpdateReadCount={this.onUpdateReadCount} />)}

                </section>
            </React.Fragment>

        )

    }
}