import { EmailService } from "../services/mail.service.js"
import { AppHeader } from '../../../cmps/AppHeader.jsx';
import { AppSideBar } from '../pages/AppSideBar.jsx';
import { EmailDetails } from "./EmailDetails.jsx"
import { MailBox } from "../cmps/MailBox.jsx"


// const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export class EmailApp extends React.Component {






   render() {


      return<React.Fragment>
                <AppHeader app="email" />
                <main className="flex">
                   <AppSideBar/>
            <Switch>
               <Route component={EmailDetails} path="/mail/mail_box/:emailId" />
               <Route component={MailBox} path="/mail/mail_box" />

            </Switch>
            </main>
         </React.Fragment>

    
   }
}