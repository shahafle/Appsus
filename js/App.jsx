import { Home } from './pages/home.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { About } from './pages/About.jsx'
import { NoteApp } from './apps/keep/NoteApp.jsx'
import { EmailApp } from './apps/mail/pages/EmailApp.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { BookApp } from './apps/book/BookApp.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>

        <React.Fragment>
            <Switch>
                <Route component={BookApp} path="/book" />
                <Route component={EmailApp} path="/mail/mail_box" />
                <Route component={NoteApp} path="/keep" />
                <Route component={About} path="/about" />
                <Route component={Home} path="/" />
            </Switch>
            <AppFooter />
        </React.Fragment>
        <UserMsg />
    </Router>
}