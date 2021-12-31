import { EmailService } from "../services/mail.service.js";
import { AppHeader } from '../../../cmps/AppHeader.jsx';
import { AppSideBar } from './AppSideBar.jsx';
import { EmailDetails } from "./EmailDetails.jsx";
import { MailBox } from "../cmps/MailBox.jsx";


// const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export class EmailApp extends React.Component {


   state = {

      unreadCount: 0,

   }


   componentDidMount() {
      this.onUpdateReadCount()
   }

   onUpdateReadCount = () => {
      const unreadCount = EmailService.getUnreadCount()
      this.setState({ unreadCount })
   }




   render() {
      const { unreadCount } = this.state

      return <React.Fragment>
         <AppHeader app="email" />
         <main className="email-app-main flex main-layout">
            <AppSideBar unreadCount={unreadCount} />
            <Switch>
               <Route component={() => <EmailDetails onUpdateReadCount={this.onUpdateReadCount} />} path="/mail/mail_box/:emailId" />
               <Route component={() => <MailBox onUpdateReadCount={this.onUpdateReadCount} />} path="/mail/mail_box" />

            </Switch>
         </main>
      </React.Fragment>


   }
}