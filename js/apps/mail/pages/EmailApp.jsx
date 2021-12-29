import { EmailService } from "../services/mail.service.js"
import { MailBox } from "../cmps/MailBox.jsx"
import { EmailDetails } from "./EmailDetails.jsx"


// const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export class EmailApp extends React.Component {






   render() {


      return<React.Fragment>
               
            <Switch>
               <Route component={EmailDetails} path="/mail/mail_box/:emailId" />
               <Route component={MailBox} path="/mail/mail_box" />

            </Switch>
         </React.Fragment>

    
   }
}