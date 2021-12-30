import { EmailService } from "../services/mail.service.js"
import { eventBusService } from '../../../services/event-bus.service.js'


export class AppSideBar extends React.Component {
    state = {
        unreadCount: this.props.unreadCount,

    }

    onFilterBy = (type) =>{
        console.log('type:', type);
        eventBusService.emit('filter-by', type)



    }


    render() {

        return (
            <aside className="app-sidebar-container flex column">

                <button className="compose-email-btn compose-style fas fa-plus "></button>

                <div className="sidebar-sort">
                    <ul>
                        <div className="sidebar-inbox flex align-center" onClick={()=> this.onFilterBy('inbox')}>
                            <i className="fas fa-inbox"></i>
                            <li>Inbox <span>{this.props.unreadCount}</span></li>
                        </div>

                        <div className="sidebar-starred flex align-center" onClick={()=> this.onFilterBy('starred')}>
                            <i className="fas fa-star"></i>
                            <li>Starred</li>
                        </div>

                        <div className="sidebar-sent flex align-center" onClick={()=> this.onFilterBy('sent')}>
                            <i className="fas fa-share"></i>
                            <li>Sent</li>
                        </div>

                        <div className="sidebar-draft flex align-center" onClick={()=> this.onFilterBy('draft')}>
                            <i className="far fa-sticky-note"></i>
                            <li>Draft</li>
                        </div>

                        <div className="sidebar-trash flex align-center" onClick={()=> this.onFilterBy('trash')}>
                            <i className="fas fa-trash-alt"></i>
                            <li>Trash</li>
                        </div>

                    </ul>

                </div>
            </aside>
        )
    }
}