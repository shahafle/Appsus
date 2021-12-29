import { MailService } from "../services/mail.service.js"





export class InboxPreview extends React.Component {

    state = {
        email: {},
    }

    componentDidMount() {
        this.setState({ email: this.props.email })
    }

    onClickStar = (emailId) => {
        MailService.toggleEmailStarred(emailId).then(email => {
            this.setState({ email })
        })
    }



    render() {
        const { email } = this.props
       
        return (
            <tr className={`inbox-table-row inbox-${email.id}`}>
                <td><button className={`${(this.state.email.isStared)?'fas':'far'} fa-star fa-lg clear-button`} onClick={() => this.onClickStar(email.id)} ></button> </td>
                <td><button className="clear-button fas fa-envelope fa-lg"></button></td>
                <td>{email.from.userName}</td>
                <td>{email.subject}</td>
                <td>{email.body}</td>

            </tr >
        )


    }


}