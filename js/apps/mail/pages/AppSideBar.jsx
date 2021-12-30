export class AppSideBar extends React.Component {
    state = {

    }



    render() {

        return (
            <aside className="app-sidebar-container flex column">
             
                    <button className="compose-email-btn compose-style fas fa-plus "></button>
              
                <div className="sidebar-sort">
                    <ul>
                        <div className="sidebar-inbox flex align-center">
                        <i className="fas fa-inbox"></i>
                        <li>Inbox</li>
                        </div>

                        <div className="sidebar-starred flex align-center">
                        <i className="fas fa-star"></i>
                        <li>Starred</li>
                        </div>

                        <div className="sidebar-sent flex align-center">
                        <i className="fas fa-share"></i>
                        <li>Sent</li>
                        </div>

                        <div className="sidebar-draft flex align-center">
                        <i className="far fa-sticky-note"></i>
                        <li>Draft</li>
                        </div>

                        <div className="sidebar-trash flex align-center">
                        <i className="fas fa-trash-alt"></i>
                        <li>Trash</li>
                        </div>

                    </ul>

                </div>
            </aside>
        )
    }
}