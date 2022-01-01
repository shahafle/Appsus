import { EmailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"
import { EmailPreview } from "./EmailPreview.jsx"
import { Loader } from "../../../cmps/Loader.jsx";

export class MailBox extends React.Component {

    state = {
        emails: [],
        loggedInUser: null,
        filterBy: {
            type: 'inbox',
            searchLine: ''
        },
    }

    removeEventBus


    componentDidMount() {
        let currType = new URLSearchParams(this.props.location.search).get('mail_box_type')
        currType = (currType === null) ? 'inbox' : currType
        this.setState((prevState) => ({
            filterBy: { ...prevState.filterBy, 'type': currType }
        }), this.loadEmails)

        this.removeEventBus = eventBusService.on('compose-email', this.loadEmails)

        EmailService.getLoggedInUser().then(loggedInUser => {
            this.setState(prevState => ({ ...prevState, loggedInUser }))
        })
    }

    componentWillUnmount() {
        this.removeEventBus()
    }

    componentDidUpdate(prevProps) {
        if (new URLSearchParams(prevProps.location.search).get('mail_box_type') !== new URLSearchParams(this.props.location.search).get('mail_box_type')) {
            let currType = new URLSearchParams(this.props.location.search).get('mail_box_type');
            currType = (currType === null) ? '' : currType;
            this.setState((prevState) => ({
                filterBy: { ...prevState.filterBy, 'type': currType }
            }), this.loadEmails)
        }
    }



    loadEmails = () => {
        EmailService.query(this.state.filterBy)
            .then(emails => {
                this.setState({ emails })
            })
    }

    onSortEmails = (sortBy) => {
        console.log('sortBy:', sortBy);
        
        EmailService.query(this.state.filterBy).then(emails => {
            EmailService.sortEmails(sortBy, emails).then(emails => {
                this.setState((prevState) => ({ ...prevState, emails }))

            })
        })

    }

    render() {
        const { emails, loggedInUser } = this.state
        if (!emails) return <Loader />
        if (emails.length === 0) return <div>No Emails to show</div>

        return (
            <React.Fragment>
                <section className="mailbox-container flex column">
                    <div className="mailbox-action-bar flex">
                        <div onClick={() => this.onSortEmails('date')}>Date</div>
                        <div onClick={() => this.onSortEmails('from')}>From</div>
                        <div onClick={() => this.onSortEmails('subject')}>Subject</div>
                        <button className="fas fa-redo clear-button"></button>

                    </div>
                    {emails.map(email => <EmailPreview key={email.id} email={email} loggedInUser={loggedInUser} />)}
                </section>
            </React.Fragment>

        )

    }
}