import { EmailService } from "../services/mail.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'

const { NavLink } = ReactRouterDOM


export class AppSideBar extends React.Component {
    state = {
        unreadCount: 0,
    }

    removeEventBus

    componentDidMount() {
        this.onUpdateReadCount()
        this.removeEventBus = eventBusService.on('update-read-count', this.onUpdateReadCount)
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    onUpdateReadCount = () => {
        EmailService.getUnreadCount().then((unreadCount) => {
            this.setState({ unreadCount })
        })
    }

    render() {
        return (
            <aside className="app-sidebar-container flex column">
                <button className="compose-email-btn fas fa-plus " onClick={() => this.props.onToggleEmailCompose(true)}></button>
                <ul className="sidebar-sort flex column">
                    <NavLink activeClassName="jhasgdja" className="sidebar-inbox flex align-center"
                        to="/mail/mail_box/?mail_box=inbox"
                    >
                        <i className="fas fa-inbox"></i>
                        <li>Inbox <span>{this.state.unreadCount}</span></li>
                    </NavLink>

                    <NavLink className="sidebar-starred flex align-center"
                        to="/mail/mail_box/?mail_box=starred"
                    >
                        <i className="fas fa-star"></i>
                        <li>Starred</li>
                    </NavLink>

                    <NavLink className="sidebar-sent flex align-center"
                        to="/mail/mail_box/?mail_box=sent"
                    >
                        <i className="fas fa-share"></i>
                        <li>Sent</li>
                    </NavLink>

                    <NavLink className="sidebar-draft flex align-center"
                        to="/mail/mail_box/?mail_box=draft"
                    >
                        <i className="far fa-sticky-note"></i>
                        <li>Draft</li>
                    </NavLink>

                    <NavLink className="sidebar-trash flex align-center"
                        to="/mail/mail_box/?mail_box=trash"
                    >
                        <i className="fas fa-trash"></i>
                        <li>trash</li>
                    </NavLink>

                </ul>


            </aside>
        )
    }
}