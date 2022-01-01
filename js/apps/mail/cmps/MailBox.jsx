import { EmailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"
import { EmailPreview } from "./EmailPreview.jsx"
import { Loader } from "../../../cmps/Loader.jsx";

export class MailBox extends React.Component {

    state = {
        emails: [],
        loggedInUser: null,
        sortBy: 'date',
        filterBy: {
            type: 'inbox',
            searchLine: ''
        },
    }

    removeEventBus

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        if (params.get('mail_box')) {
            let currType = params.get('mail_box')
            currType = (currType === null) ? '' : currType
            this.setState((prevState) => ({
                filterBy: { ...prevState.filterBy, 'type': currType }
            }), this.loadEmails)
        } else {
            let searchLine = params.get('search')
            searchLine = (searchLine === null) ? '' : searchLine
            this.setState((prevState) => ({
                filterBy: { ...prevState.filterBy, searchLine }
            }), this.loadEmails)
        }

        this.removeEventBus = eventBusService.on('compose-email', this.loadEmails)

        EmailService.getLoggedInUser().then(loggedInUser => {
            this.setState(prevState => ({ ...prevState, loggedInUser }))
        })
    }

    componentWillUnmount() {
        this.removeEventBus()
    }

    componentDidUpdate(prevProps) {

        const params = new URLSearchParams(this.props.location.search);
        const prevParams = new URLSearchParams(prevProps.location.search);
        if (params.get('mail_box') === prevParams.get('mail_box') && params.get('search') === prevParams.get('search')) return

        if (params.get('mail_box')) {
            let currType = params.get('mail_box')
            currType = (currType === null) ? '' : currType
            this.setState((prevState) => ({
                filterBy: { ...prevState.filterBy, 'type': currType }
            }), this.loadEmails)
        } else {
            let searchLine = params.get('search')
            searchLine = (searchLine === null) ? '' : searchLine
            this.setState((prevState) => ({
                filterBy: { ...prevState.filterBy, searchLine }
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
        EmailService.query(this.state.filterBy).then(emails => {
            EmailService.sortEmails(sortBy, emails).then(emails => {
                this.setState((prevState) => ({ ...prevState, emails, sortBy }))

            })
        })

    }

    render() {
        const { emails, loggedInUser, sortBy } = this.state
        if (!emails) return <Loader />
        if (emails.length === 0) return <div>No Emails to show</div>

        return (
            <React.Fragment>
                <section className="mailbox-container flex column">
                    <div className="mailbox-action-bar flex">
                        <i className="fas fa-sort"></i>
                        <div className={`${(sortBy === 'date') ? 'sort-active' : ''} `} onClick={() => this.onSortEmails('date')}>Date</div>
                        <div className={`${(sortBy === 'from') ? 'sort-active' : ''} `} onClick={() => this.onSortEmails('from')}>From</div>
                        <div className={`${(sortBy === 'subject') ? 'sort-active' : ''} `} onClick={() => this.onSortEmails('subject')}>Subject</div>
                        <button className="fas fa-redo clear-button" onClick={() => location.reload()}></button>

                    </div>
                    {emails.map(email => <EmailPreview key={email.id} email={email} loggedInUser={loggedInUser} loadEmails={this.loadEmails} />)}
                </section>
            </React.Fragment>

        )

    }
}