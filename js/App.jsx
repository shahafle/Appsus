import { Home } from './pages/home.jsx'
import { NoteApp } from './apps/keep/pages/NoteApp.jsx'
import { MailApp } from './apps/mail/pages/MailApp.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <React.Fragment>
            <AppHeader />
            <Switch>
                {/* <Route component={BookApp} path="/book" /> */}
                <Route component={MailApp} path="/mail" />
                <Route component={NoteApp} path="/keep" />
                {/* <Route component={About} path="/about" /> */}
                <Route component={Home} path="/" />
            </Switch>
            {/* <AppFooter /> */}
        </React.Fragment>
        <UserMsg />
    </Router>
}

