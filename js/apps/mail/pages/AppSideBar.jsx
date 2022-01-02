import { EmailService } from "../services/mail.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'

const { NavLink } = ReactRouterDOM

export class AppSideBar extends React.Component {
    state = {
        unreadCount: 0,
        selectedNav: '',

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

    onSelectNav = (selectedNav) => {
        this.setState((prevState) => ({ ...prevState, selectedNav }))
    }

    render() {

        const {selectedNav, unreadCount}= this.state

        return (
            <aside className="app-sidebar-container flex column">
                <button className="compose-email-btn fas fa-plus " onClick={() => this.props.onToggleEmailCompose(true)}></button>
                <ul className="sidebar-sort flex column">
                    <NavLink onClick={() => this.onSelectNav('inbox')} className={`${(selectedNav === 'inbox') ? 'nav-select' : ''} flex align-center`}
                        to="/mail/mail_box/?mail_box=inbox"
                    >
                        <i className="fas fa-inbox"></i>
                        <li>Inbox <span>{unreadCount}</span></li>
                    </NavLink>

                    <NavLink onClick={() => this.onSelectNav('starred')} className={`${(selectedNav === 'starred') ? 'nav-select' : ''} flex align-center`}
                        to="/mail/mail_box/?mail_box=starred"
                    >
                        <i className="fas fa-star"></i>
                        <li>Starred</li>
                    </NavLink>

                    <NavLink onClick={() => this.onSelectNav('read')} className={`${(selectedNav === 'read') ? 'nav-select' : ''} flex align-center`}
                        to="/mail/mail_box/?mail_box=read"
                    >
                        <i class="fas fa-envelope-open-text"></i>
                        <li>Read</li>
                    </NavLink>

                    <NavLink onClick={() => this.onSelectNav('unread')} className={`${(selectedNav === 'unread') ? 'nav-select' : ''} flex align-center`}
                        to="/mail/mail_box/?mail_box=unread"
                    >
                        <i class="fas fa-envelope"></i>
                        <li>Unread</li>
                    </NavLink>

                    <NavLink onClick={() => this.onSelectNav('sent')} className={`${(selectedNav === 'sent') ? 'nav-select' : ''} flex align-center`}
                        to="/mail/mail_box/?mail_box=sent"
                    >
                        <i className="fas fa-share"></i>
                        <li>Sent</li>
                    </NavLink>

                    <NavLink onClick={() => this.onSelectNav('draft')} className={`${(selectedNav === 'draft') ? 'nav-select' : ''} flex align-center`}
                        to="/mail/mail_box/?mail_box=draft"
                    >
                        <i className="far fa-sticky-note"></i>
                        <li>Draft</li>
                    </NavLink>

                    <NavLink onClick={() => this.onSelectNav('trash')} className={`${(selectedNav === 'trash') ? 'nav-select' : ''} flex align-center`}
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