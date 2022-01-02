import { eventBusService } from "../../../services/event-bus.service.js"
import { AppHeader } from '../../../cmps/AppHeader.jsx';
import { MailBox } from "../cmps/MailBox.jsx";
import { AppSideBar } from './AppSideBar.jsx';
import { EmailDetails } from "./EmailDetails.jsx";
import { ComposeEmail } from "../cmps/ComposeEmail.jsx"

const { Route, Switch } = ReactRouterDOM

export class EmailApp extends React.Component {

   state = {

      isShowCompose: false,

   }

   removeEventBus

   componentDidMount() {

      this.removeEventBus = eventBusService.on('init-reply', (email) => {
         this.setState({ isShowCompose: true }, () => eventBusService.emit('email-reply', email))
      })
   }

   componentWillUnmount() {
      this.removeEventBus();
   }

   onToggleEmailCompose = (toOpen) => {
      this.setState({ isShowCompose: toOpen })
   }

   render() {

      const { unreadCount, isShowCompose } = this.state

      return <React.Fragment>
         <AppHeader app="email" />
         <main className="email-app-main flex main-layout">
            <AppSideBar unreadCount={unreadCount} onToggleEmailCompose={this.onToggleEmailCompose} />
            <Switch>
               <Route component={EmailDetails} path="/mail/mail_box/:emailId" />
               <Route component={MailBox} path="/mail/mail_box" />
            </Switch>
            {isShowCompose && <ComposeEmail onToggleEmailCompose={this.onToggleEmailCompose} isShowCompose={isShowCompose} />}
         </main>
      </React.Fragment>
   }
}