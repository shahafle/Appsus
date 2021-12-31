import { EmailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event-bus.service.js"
import { AppHeader } from '../../../cmps/AppHeader.jsx';
import { AppSideBar } from './AppSideBar.jsx';
import { EmailDetails } from "./EmailDetails.jsx";
import { MailBox } from "../cmps/MailBox.jsx";
import { ComposeEmail } from "../cmps/ComposeEmail.jsx"


const { Route, Switch } = ReactRouterDOM


export class EmailApp extends React.Component {

   state = {

      isShowCompose: false,


   }

   removeEventBus

   componentDidMount() {
      // this.removeEventBus = eventBusService.on('compose-email', isShowCompose => {
      //    this.setState({ isShowCompose })

      // })
   }

   componentWillUnmount() {
      this.removeEventBus()
   }

   onOpenEmailCompose = () => {
      let { isShowCompose } = this.state
      isShowCompose = !isShowCompose
      this.setState({ isShowCompose })

   }

   onCloseEmailCompose = () => {
      this.setState({ isShowCompose: false })

   }

   render() {
      const { unreadCount, isShowCompose } = this.state

      return <React.Fragment>
         <AppHeader app="email" />
         <main className="email-app-main flex main-layout">
            <AppSideBar unreadCount={unreadCount} onOpenEmailCompose={this.onOpenEmailCompose} />

            <Switch>
               <Route component={EmailDetails} path="/mail/mail_box/:emailId" />
               <Route component={MailBox} path="/mail/mail_box" />
            </Switch>

            {isShowCompose && <ComposeEmail onCloseEmailCompose={this.onCloseEmailCompose} />}

         </main>
      </React.Fragment>


   }
}