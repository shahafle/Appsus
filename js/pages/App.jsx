import { Home } from './pages/home.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <React.Fragment>
            <AppHeader />
            <Switch>
                <Route component={About} path="/about" />
                <Route component={Home} path="/" />
            </Switch>
            <AppFooter />
        </React.Fragment>
        <UserMsg />
    </Router>
}

