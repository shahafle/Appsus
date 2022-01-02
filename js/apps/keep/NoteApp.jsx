import { AppHeader } from '../../cmps/AppHeader.jsx';
import { DynamicNoteDetails } from './pages/dynamic-note-setails/DynamicNoteDetails.jsx';
import { NotesBoard } from './pages/NotesBoard.jsx'

const { Route, Switch } = ReactRouterDOM

export class NoteApp extends React.Component {

   render() {
      return <React.Fragment>
         <AppHeader app="notes" />
         <Switch>
            {/* <Route component={DynamicNoteDetails} path="/keep/note/:noteId" /> */}
            <Route component={NotesBoard} path="/keep/board" />
         </Switch>
      </React.Fragment>
   }
}