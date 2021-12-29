import { EmailInbox } from "../cmps/EmailInbox.jsx"
import { MailService } from "../services/mail.service.js"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM


export class EmailApp extends React.Component {






   render() {


      return <Router>
         <React.Fragment>
          
               <div>EMAIL APP</div>
               <Route component={EmailInbox} path="/mail/mail_inbox"/>

         </React.Fragment>

      </Router>
   }
}