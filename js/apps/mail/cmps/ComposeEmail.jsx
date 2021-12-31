import { EmailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.js"

export class ComposeEmail extends React.Component {

    state = {
        email: {
            to: '',
            subject: '',
            body: '',

        }

    }



    toInputRef = React.createRef()

    componentDidMount() {
        this.toInputRef.current.focus()
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ email: { ...prevState.email, [field]: value } }))

    }



    onSendEmail = (ev) => {
        ev.preventDefault()
        EmailService.sendEmail(this.state.email)
        this.props.onCloseEmailCompose()
        eventBusService.emit('compose-email', this.loadEmails)
        this.onSendEmailModal()

    }


    onSendEmailModal = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
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
            <section className="compose-email-container flex column ">
                <div className="composer-header flex space-between">
                    <div className="composer-title">New Email</div>
                    <div className="composer-title-btns flex">
                        <button className="fas fa-minus clear-button"></button>
                        <button className="fas fa-times clear-button" onClick={() => this.props.onCloseEmailCompose()}></button>
                    </div>
                </div>

                <form className="flex column" id="compose" className="flex column" onSubmit={this.onSendEmail}>
                    <label>To&nbsp;
                        <input
                            name="to"
                            // value={ }
                            type="email"
                            placeholder="user@trinity.com"
                            required
                            onChange={this.handleChange}
                            ref={this.toInputRef}
                        /></label>

                    <label>Subject&nbsp;
                        <input
                            name="subject"
                            // value={ }
                            type="text"
                            placeholder="subject"
                            onChange={this.handleChange}
                        /></label>


                    <textarea
                        name="body"
                        // value={ }
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