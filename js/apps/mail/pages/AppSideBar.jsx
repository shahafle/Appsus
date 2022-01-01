import { EmailService } from "../services/mail.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'

const { Link } = ReactRouterDOM


export class AppSideBar extends React.Component {
    state = {
        unreadCount: 0,
    }

    removeEventBus

    componentDidMount() {
        this.onUpdateReadCount()
        this.removeEventBus = eventBusService.on('update-read-count', this.onUpdateReadCount)

    }

    onUpdateReadCount = () => {
        EmailService.getUnreadCount().then((unreadCount) => {
            this.setState({ unreadCount })
        })
    }


    render() {

        return (
            <aside className="app-sidebar-container flex column">

                <button className="compose-email-btn fas fa-plus " onClick={this.props.onOpenEmailCompose}></button>

                <ul className="sidebar-sort flex column">
                    <Link className="sidebar-inbox flex align-center"
                        to="/mail/mail_box/?mail_box_type=inbox"
                    >
                        <i className="fas fa-inbox"></i>
                        <li>Inbox <span>{this.state.unreadCount}</span></li>
                    </Link>

                    <Link className="sidebar-starred flex align-center"
                        to="/mail/mail_box/?mail_box_type=starred"
                    >
                        <i className="fas fa-star"></i>
                        <li>Starred</li>
                    </Link>

                    <Link className="sidebar-sent flex align-center"
                        to="/mail/mail_box/?mail_box_type=sent"
                    >
                        <i className="fas fa-share"></i>
                        <li>Sent</li>
                    </Link>

                    <Link className="sidebar-draft flex align-center"
                        to="/mail/mail_box/?mail_box_type=draft"
                    >
                        <i className="far fa-sticky-note"></i>
                        <li>Draft</li>
                    </Link>

                    <Link className="sidebar-trash flex align-center"
                        to="/mail/mail_box/?mail_box_type=trash"
                    >
                        <i className="fas fa-trash"></i>
                        <li>trash</li>
                    </Link>

                </ul>


            </aside>
        )
    }
}