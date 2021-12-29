import { AppHeader } from '../../cmps/AppHeader.jsx';
import { NotesBoard } from './pages/NotesBoard.jsx'

const { Route, Switch } = ReactRouterDOM

export class NoteApp extends React.Component {
   render() {
      return <React.Fragment>
         <AppHeader app="keep" />
         <Switch>
            <Route component={NotesBoard} path="/keep/board" />
         </Switch>
      </React.Fragment>
   }
}