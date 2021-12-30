import { utilService } from "../../../services/util.service.js";
import { EmailService } from "../services/mail.service.js"
// import { LongTxt } from "../../../cmps/LongTxt.jsx";
import { Loader } from "../../../cmps/Loader.jsx";

const { Link } = ReactRouterDOM

export class EmailPreview extends React.Component {

    state = {
        email: null,
    }

    componentDidMount() {
        this.setState({ email: this.props.email })
    }



    onToggleAttributes = (emailId, attribute) => {
        EmailService.toggleEmailAttributes(emailId, attribute).then(email => {
            this.setState({ email })
            // this.props.onUpdateReadCount()
            this.onToggleAttributesModal(attribute)
        })
    }

    onToggleAttributesModal = (attribute) =>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
          })
          let txt =''
            if(attribute === 'star'){
                txt = (this.state.email.isStarred)? '⭐Email Starred': 'Email Unstarred'
            } else if (attribute === 'read') {
                txt = (this.state.email.isRead)? 'Email marked as Read': 'Email marked as unread'
            } else if (attribute === 'trash'){
                txt =  'Email moved to trash'
            }
          Toast.fire({
            title: txt
          })
    }



    render() {
        const { email } = this.state
        if (!email) return <Loader/>

        return (
            <section className="email-preview flex ">
                <div className="preview-action-btns align-start">
                <button className="fas fa-trash-alt fa-lg clear-button" onClick={() => this.onToggleAttributes(email.id, 'trash')} ></button>
                <button className={`${(this.state.email.isStarred) ? 'fas' : 'far'} fa-star fa-lg clear-button`} onClick={() => this.onToggleAttributes(email.id, 'star')} ></button>
                <button className={` fas fa-envelope${(this.state.email.isRead) ? '-open' : ''} fa-lg clear-button`} onClick={() => this.onToggleAttributes(email.id, 'read')}></button>
                </div>
                <Link className="clean-link flex " to={`/mail/mail_box/${this.state.email.id}`}>
                    <p>{email.from.userName}</p>
                    <p>{email.subject}</p>
                     <p className="email-body">{email.body}</p> 
                </Link>
                    <div className="align-end">{utilService.getDate(email.sentAt)}</div>

            </section >
        )


    }


}