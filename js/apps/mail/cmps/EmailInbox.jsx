import { MailService } from "../services/mail.service.js"


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

                Inbox


            </section>


        )

    }
}