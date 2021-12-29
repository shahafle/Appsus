import { MailService } from "../services/mail.service.js"
import { InboxPreview } from "./InboxPreview.jsx"

export class EmailInbox extends React.Component {


    state = {
        emails: [],
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {

        MailService.query().then(emails => {
            this.setState({ emails })
        })
    }



    render() {
        const { emails } = this.state


        if (!emails) return <div>'Loading...'</div>
        return (
            <section className="inbox-container">
                    
                <table className="inbox-preview-table">
                    <tbody>
                    {emails.map(email => <InboxPreview key={email.id} email={email} />)}
                    </tbody>
                    </table>

            </section>


        )

    }
}