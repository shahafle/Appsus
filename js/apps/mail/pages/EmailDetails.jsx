import { utilService } from "../../../services/util.service.js";
import { EmailService } from "../services/mail.service.js"
import { eventBusService } from "../../../services/event-bus.service.jsx"

import { DetailsActionBar } from "../cmps/DetailsActionBar.jsx";
import { Loader } from "../../../cmps/Loader.jsx";

const { withRouter } = ReactRouterDOM

class _EmailDetails extends React.Component {

    state = {
        email: null,
    }


    componentDidMount() {
        this.loadEmail()
    }

    loadEmail = () => {
        const { emailId } = this.props.match.params
        EmailService.getEmailById(emailId).then((email) => {
            this.setState({ email })
        })
    }

    onBackToMailBox = () => {
        this.props.history.goBack()
    }

    onToggleAttributes = (emailId, attribute) => {
        // console.log('this.state.email.isTrashed:', this.state.email.isTrashed);

        // if (this.state.email.isTrashed){
        //      this.onDeleteModal()
        // }
        if (this.state.email.isTrashed) attribute = 'delete'
        EmailService.toggleEmailAttributes(emailId, attribute).then(email => {
            this.setState({ email })
            eventBusService.emit('update-read-count', this.onUpdateReadCount)

            if (attribute === 'delete' || attribute === 'trash') this.onBackToMailBox()



        })

    }


    // onDeleteModal = () => {
    //     Swal.fire({
    //         title: 'Delete this email??',
    //         icon: 'warning',

    //         showCancelButton: true,
    //         confirmButtonColor: '#d33',
    //         cancelButtonColor: '#7F7C82',
    //         confirmButtonText: 'Yes, delete it!',
    //         timer: 1500,
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Email has been deleted',
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             })
    //         }
    //     })
    // }


    render() {
        const { email } = this.state
        if (!email) return <Loader />


        return (

            <section className="email-details flex column">
                <DetailsActionBar email={email} onToggleAttributes={this.onToggleAttributes} onBackToMailBox={this.onBackToMailBox} />
                <div className="email-details-container flex column ">
                    <div className="details-title-container flex space-between align-center">
                        <p className="email-title">{email.subject}</p>
                        <div className="flex row">
                            <button className="details-reply fas fa-reply fa-lg clear-button"></button>
                            <p>{utilService.getDate(email.sentAt)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="email-details-from"><span>{email.from.userName}</span> {`<${email.from.address}>`}</p>
                        <div>{email.body}</div>
                    </div>
                </div>
            </section>

        )

    }


}


export const EmailDetails = withRouter(_EmailDetails)
