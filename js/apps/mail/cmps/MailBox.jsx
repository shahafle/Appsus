import { EmailService } from "../services/mail.service.js"
import { EmailPreview } from "./EmailPreview.jsx"

export class MailBox extends React.Component {


    state = {
        emails: [],
        filterBy:null,
        
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


        if (!emails) return <div>'Loading...'</div>
        return (
            <section className="mailbox-container">
                                    
                    {emails.map(email => <EmailPreview key={email.id} email={email} />)}  

            </section>


        )

    }
}