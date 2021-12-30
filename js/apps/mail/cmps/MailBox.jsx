import { EmailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"
import { EmailPreview } from "./EmailPreview.jsx"
import { Loader } from "../../../cmps/Loader.jsx";

export class MailBox extends React.Component {


    state = {
        emails: [],
        filterBy: {
            type: 'inbox',
            searchLine: ''
        },
    }

    removeEventBus

    componentDidMount() {
        // const { filterBy } = this.state
        this.removeEventBus = eventBusService.on('filter-by', type => {
            this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, type } }), this.loadEmails)

      
        })
        this.loadEmails()
        
    }

    loadEmails = () => {
        const {filterBy} = this.state
        EmailService.query(filterBy)
            .then(emails => {
                
                this.setState({ emails })
            })
    }


    render() {
        const { emails } = this.state
        if (emails.length === 0) return <div>No Results</div>

        if (!emails) return <Loader />
        return (
            <React.Fragment>

                <section className="mailbox-container flex column">
                    {emails.map(email => <EmailPreview key={email.id} email={email} onUpdateReadCount={this.props.onUpdateReadCount} />)}

                </section>
            </React.Fragment>

        )

    }
}