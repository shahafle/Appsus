import { EmailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export class ComposeEmail extends React.Component {

    state = {
        draft: {
            id: 0,
            address: '',
            subject: '',
            body: '',
        },
        isMinimize: false
    }

    sendDraftInterval
    removeEventBus
    toInputRef = React.createRef()

    componentDidMount() {
        this.toInputRef.current.focus()
        this.sendDraftInterval = setInterval(this.onSaveDraft, 2500);

        this.removeEventBus = eventBusService.on('email-reply', (email) => {
            this.setState((prevState) => ({
                draft: { ...prevState.draft, address: email.from.address }
            }))
        })
    }

    componentWillUnmount() {
        clearInterval(this.sendDraftInterval);
        this.removeEventBus();
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ draft: { ...prevState.draft, [field]: value } }))
    }

    onMinimizeCompose = () => {
        let { isMinimize } = this.state
        isMinimize = !isMinimize
        this.setState({ isMinimize })
    }

    onSaveDraft = () => {
        EmailService.saveDraft(this.state.draft)
            .then(newDraft => this.setState({ draft: newDraft }))
    }

    onSendEmail = (ev) => {
        ev.preventDefault()

        EmailService.sendEmail(this.state.draft.id)
        this.setState({
            draft: {
                draft: {
                    id: 0,
                    address: '',
                    subject: '',
                    body: '',
                }
            }
        })
        this.props.onToggleEmailCompose(false)
        eventBusService.emit('compose-email', this.loadEmails)
        this.onSendEmailMsg()
    }

    onSendEmailMsg = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            width: 200,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: 'Email Sent!'
        })
    }

    render() {

        return (
            <section className={`compose-email-container ${(this.state.isMinimize) ? 'minimize' : ''} flex column`}>
                <div className="composer-header flex space-between">
                    <div className="composer-title">New Email</div>
                    <div className="composer-title-btns flex">
                        <button className="fas fa-minus clear-button" onClick={() => this.onMinimizeCompose()}></button>
                        <button className="fas fa-times clear-button" onClick={() => this.props.onToggleEmailCompose(false)}></button>
                    </div>
                </div>

                <form className="flex column" id="compose" className="flex column" onSubmit={this.onSendEmail}>
                    <label>To&nbsp;
                        <input
                            name="address"
                            value={this.state.draft.address}
                            type="email"
                            placeholder="user@trinity.com"
                            required
                            onChange={this.handleChange}
                            ref={this.toInputRef}
                        /></label>

                    <label>Subject&nbsp;
                        <input
                            name="subject"
                            type="text"
                            placeholder="subject"
                            onChange={this.handleChange}
                        /></label>


                    <textarea
                        name="body"
                        id="compose"
                        cols="30"
                        rows="10"
                        required
                        onChange={this.handleChange}
                    ></textarea>
                    <button className="composer-send-btn">Send</button>
                </form>
            </section>
        )
    }
}